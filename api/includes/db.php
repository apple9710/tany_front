<?php
/**
 * 데이터베이스 헬퍼 함수
 *
 * DB 쿼리 실행, 데이터 조회 등의 공통 함수 제공
 */

require_once __DIR__ . '/../config/database.php';

// ============================================
// SELECT 쿼리 실행 (여러 행 반환)
// ============================================
function dbQuery($sql, $params = []) {
    $conn = getDBConnection();

    try {
        // Prepared Statement 생성
        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            throw new Exception('쿼리 준비 실패: ' . $conn->error);
        }

        // 파라미터 바인딩
        if (!empty($params)) {
            $types = '';
            $values = [];

            foreach ($params as $param) {
                if (is_int($param)) {
                    $types .= 'i';
                } elseif (is_float($param)) {
                    $types .= 'd';
                } else {
                    $types .= 's';
                }
                $values[] = $param;
            }

            $stmt->bind_param($types, ...$values);
        }

        // 쿼리 실행
        $stmt->execute();

        // 결과 가져오기
        $result = $stmt->get_result();
        $data = [];

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }

        $stmt->close();
        return $data;

    } catch (Exception $e) {
        error_log('DB Query Error: ' . $e->getMessage());
        return false;
    }
}

// ============================================
// SELECT 쿼리 실행 (단일 행 반환)
// ============================================
function dbQueryOne($sql, $params = []) {
    $result = dbQuery($sql, $params);

    if ($result && count($result) > 0) {
        return $result[0];
    }

    return null;
}

// ============================================
// INSERT/UPDATE/DELETE 쿼리 실행
// ============================================
function dbExecute($sql, $params = []) {
    $conn = getDBConnection();

    try {
        // Prepared Statement 생성
        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            throw new Exception('쿼리 준비 실패: ' . $conn->error);
        }

        // 파라미터 바인딩
        if (!empty($params)) {
            $types = '';
            $values = [];

            foreach ($params as $param) {
                if (is_int($param)) {
                    $types .= 'i';
                } elseif (is_float($param)) {
                    $types .= 'd';
                } else {
                    $types .= 's';
                }
                $values[] = $param;
            }

            $stmt->bind_param($types, ...$values);
        }

        // 쿼리 실행
        $success = $stmt->execute();
        $affectedRows = $stmt->affected_rows;
        $insertId = $conn->insert_id;

        $stmt->close();

        return [
            'success' => $success,
            'affected_rows' => $affectedRows,
            'insert_id' => $insertId
        ];

    } catch (Exception $e) {
        error_log('DB Execute Error: ' . $e->getMessage());
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

// ============================================
// INSERT 쿼리 (배열로 데이터 전달)
// ============================================
function dbInsert($table, $data) {
    $columns = array_keys($data);
    $values = array_values($data);

    $columnsList = implode(', ', array_map(function($col) {
        return "`$col`";
    }, $columns));

    $placeholders = implode(', ', array_fill(0, count($values), '?'));

    $sql = "INSERT INTO `$table` ($columnsList) VALUES ($placeholders)";

    return dbExecute($sql, $values);
}

// ============================================
// UPDATE 쿼리 (배열로 데이터 전달)
// ============================================
function dbUpdate($table, $data, $where, $whereParams = []) {
    $setParts = [];
    $values = [];

    foreach ($data as $column => $value) {
        $setParts[] = "`$column` = ?";
        $values[] = $value;
    }

    $setClause = implode(', ', $setParts);
    $params = array_merge($values, $whereParams);

    $sql = "UPDATE `$table` SET $setClause WHERE $where";

    return dbExecute($sql, $params);
}

// ============================================
// DELETE 쿼리
// ============================================
function dbDelete($table, $where, $params = []) {
    $sql = "DELETE FROM `$table` WHERE $where";
    return dbExecute($sql, $params);
}

// ============================================
// 페이지네이션용 카운트 쿼리
// ============================================
function dbCount($table, $where = '1=1', $params = []) {
    $sql = "SELECT COUNT(*) as count FROM `$table` WHERE $where";
    $result = dbQueryOne($sql, $params);

    return $result ? (int)$result['count'] : 0;
}

// ============================================
// 트랜잭션 시작
// ============================================
function dbBeginTransaction() {
    $conn = getDBConnection();
    return $conn->begin_transaction();
}

// ============================================
// 트랜잭션 커밋
// ============================================
function dbCommit() {
    $conn = getDBConnection();
    return $conn->commit();
}

// ============================================
// 트랜잭션 롤백
// ============================================
function dbRollback() {
    $conn = getDBConnection();
    return $conn->rollback();
}

// ============================================
// SQL Injection 방지용 이스케이프
// ============================================
function dbEscape($value) {
    $conn = getDBConnection();
    return $conn->real_escape_string($value);
}

/**
 * 사용 예시:
 *
 * // SELECT 여러 행
 * $users = dbQuery("SELECT * FROM admin_users WHERE id > ?", [0]);
 *
 * // SELECT 단일 행
 * $user = dbQueryOne("SELECT * FROM admin_users WHERE id = ?", [1]);
 *
 * // INSERT
 * $result = dbInsert('inquiries', [
 *     'name' => '홍길동',
 *     'phone' => '010-1234-5678',
 *     'message' => '문의내용'
 * ]);
 *
 * // UPDATE
 * $result = dbUpdate('inquiries', ['status' => 'completed'], 'id = ?', [1]);
 *
 * // DELETE
 * $result = dbDelete('inquiries', 'id = ?', [1]);
 *
 * // COUNT
 * $total = dbCount('inquiries', 'status = ?', ['pending']);
 */

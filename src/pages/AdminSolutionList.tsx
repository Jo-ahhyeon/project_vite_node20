import { useEffect, useState } from "react";

interface Solution {
  id: number;
  name: string;
  pet_name: string;
  contact: string;
  question1_answer: string;
  question2_text: string;
  created_at: string;
}

const BASE = import.meta.env.PROD ? "/animora" : "";
const API_BASE = `${BASE}/api`;
const ADMIN_BASE = `${BASE}/admin`;

export default function AdminSolutionList() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ▽ 서버 세션 기반 관리자 로그인 상태
  const [isAdmin, setIsAdmin] = useState(false);

  // ▽ 로그인 폼 입력값
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Solution>>({});

  // ------------------ 데이터 조회 ------------------
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/solution_list.php`);
      const data = await res.json();

      if (!data.success) {
        setError(data.message || "조회 실패");
        return;
      }

      setSolutions(data.data);
    } catch (err) {
      console.error(err);
      setError("서버 통신 실패");
    } finally {
      setLoading(false);
    }
  };

  // ------------------ 로그인 상태 확인 ------------------
  const checkLogin = async () => {
    try {
      const res = await fetch(`${ADMIN_BASE}/admin_check.php`, {
      credentials: "include",
    });

      const data = await res.json();
      setIsAdmin(!!data.loggedIn);
    } catch (err) {
      console.error("admin_check 호출 실패:", err);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    fetchData();
    checkLogin();
  }, []);

  // ------------------ 수정 모드 진입 ------------------
  const startEdit = (item: Solution) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  // 수정 입력값 변경
  const handleEditChange = (field: keyof Solution, value: string) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ------------------ 수정 저장 ------------------
  const saveEdit = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/solution_update.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name: editForm.name,
          pet_name: editForm.pet_name,
          contact: editForm.contact,
          question1_answer: editForm.question1_answer,
          question2_text: editForm.question2_text,
        }),
      });

      const text = await res.text();
      console.log("🧾 수정 응답 원본:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        alert("서버에서 JSON이 아닌 응답이 왔어.\n\n" + text.slice(0, 200));
        return;
      }

      if (!data.success) {
        alert("수정 실패: " + (data.message || ""));
        return;
      }

      alert("수정 완료");
      setEditingId(null);
      fetchData();
    } catch (err) {
      console.error("수정 요청 에러:", err);
      alert("수정 요청 실패");
    }
  };

  // ------------------ 삭제 ------------------
  const handleDelete = async (id: number) => {
    if (!window.confirm("정말 삭제할까요?")) return;

    try {
      const res = await fetch(`${API_BASE}/solution_delete.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const text = await res.text();
      console.log("🧾 삭제 응답 원본:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        alert("서버에서 JSON이 아닌 응답이 왔어.\n\n" + text.slice(0, 200));
        return;
      }

      if (!data.success) {
        alert("삭제 실패: " + (data.message || ""));
        return;
      }

      alert("삭제 완료");
      setSolutions((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("삭제 요청 에러:", err);
      alert("삭제 요청 실패");
    }
  };

  // ------------------ 로그인 요청 (프리플라이트 안 나게) ------------------
  const handleLogin = async () => {
    try {
      const body = new URLSearchParams({
        id: loginId,
        pw: loginPw,
      }).toString();

      const res = await fetch(`${ADMIN_BASE}/admin_login.php`, {
        method: "POST",
        credentials: "include", // 세션 쿠키 저장
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body,
      });

      const text = await res.text();
      console.log("🔐 로그인 응답 원본:", text);

      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        alert("로그인 응답이 JSON 형식이 아니야:\n\n" + text.slice(0, 200));
        return;
      }

      if (!data.success) {
        alert(data.message || "로그인 실패");
        return;
      }

      alert("로그인 성공!");
      setLoginId("");
      setLoginPw("");

      // 로그인 상태 다시 확인해서 isAdmin 갱신
      checkLogin();
    } catch (err) {
      console.error("로그인 요청 실패:", err);
      alert("로그인 요청 실패");
    }
  };

  // ------------------ 로그아웃 ------------------
  const handleLogout = async () => {
    try {
      await fetch(`${ADMIN_BASE}/logout.php`, {
        method: "GET",
        credentials: "include",
      });
    } catch (err) {
      console.error("로그아웃 요청 실패:", err);
    } finally {
      setIsAdmin(false);
    }
  };

  // ================== 렌더 ==================
  return (
    <div className="pt-xxl px-xl pb-xxl">
      <h1 className="text-lg font-bold mb-4 text-center">맞춤 솔루션 신청 목록 (Admin)</h1>

      {/* 로그인 섹션 */}
      {!isAdmin ? (
        <div className="mb-6 flex flex-col gap-2 max-w-container-sm mx-auto border-2 p-8">
          <p className="text-sm text-gray-700">
            관리자 페이지입니다. 로그인 후에 목록을 확인할 수 있어요.
          </p>
          <input
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            placeholder="관리자 아이디"
            className="border px-3 py-2 text-sm"
          />
          <input
            type="password"
            value={loginPw}
            onChange={(e) => setLoginPw(e.target.value)}
            placeholder="비밀번호"
            className="border px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={handleLogin}
            className="px-4 py-2 text-sm bg-black text-white rounded w-fit"
          >
            로그인
          </button>
        </div>
      ) : (
        <div className="mb-4 flex justify-between items-center">
          <p className="text-sm text-green-700">
            관리자 로그인 상태입니다. (수정·삭제 가능)
          </p>
          <button
            type="button"
            onClick={handleLogout}
            className="px-3 py-1 text-xs bg-gray-200 rounded"
          >
            로그아웃
          </button>
        </div>
      )}

      {loading && <p>로딩 중...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* 로그인 안 되어 있으면 안내만 보여주고, 테이블은 안 보이게 */}
      {!loading && !error && isAdmin && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-2">ID</th>
                <th className="border px-2 py-2">이름</th>
                <th className="border px-2 py-2">반려동물</th>
                <th className="border px-2 py-2">연락처</th>
                <th className="border px-2 py-2">1번 답변</th>
                <th className="border px-2 py-2">2번 답변</th>
                <th className="border px-2 py-2 whitespace-nowrap">작성일</th>
                <th className="border px-2 py-2">관리</th>
              </tr>
            </thead>
            <tbody>
              {solutions.map((item) => {
                const isEditing = editingId === item.id;
                return (
                  <tr key={item.id}>
                    <td className="border px-2 py-1 text-center">{item.id}</td>

                    {/* 이름 */}
                    <td className="border px-2 py-1">
                      {isEditing ? (
                        <input
                          className="border px-1 py-0.5 w-full"
                          value={editForm.name ?? ""}
                          onChange={(e) =>
                            handleEditChange("name", e.target.value)
                          }
                        />
                      ) : (
                        item.name
                      )}
                    </td>

                    {/* 반려동물 */}
                    <td className="border px-2 py-1">
                      {isEditing ? (
                        <input
                          className="border px-1 py-0.5 w-full"
                          value={editForm.pet_name ?? ""}
                          onChange={(e) =>
                            handleEditChange("pet_name", e.target.value)
                          }
                        />
                      ) : (
                        item.pet_name
                      )}
                    </td>

                    {/* 연락처 */}
                    <td className="border px-2 py-1">
                      {isEditing ? (
                        <input
                          className="border px-1 py-0.5 w-full"
                          value={editForm.contact ?? ""}
                          onChange={(e) =>
                            handleEditChange("contact", e.target.value)
                          }
                        />
                      ) : (
                        item.contact
                      )}
                    </td>

                    {/* 1번 답변 */}
                    <td className="border px-2 py-1">
                      {isEditing ? (
                        <textarea
                          className="border px-1 py-0.5 w-full"
                          rows={2}
                          value={editForm.question1_answer ?? ""}
                          onChange={(e) =>
                            handleEditChange(
                              "question1_answer",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        item.question1_answer
                      )}
                    </td>

                    {/* 2번 답변 */}
                    <td className="border px-2 py-1">
                      {isEditing ? (
                        <textarea
                          className="border px-1 py-0.5 w-full"
                          rows={3}
                          value={editForm.question2_text ?? ""}
                          onChange={(e) =>
                            handleEditChange("question2_text", e.target.value)
                          }
                        />
                      ) : (
                        item.question2_text
                      )}
                    </td>

                    <td className="border px-2 py-1 whitespace-nowrap">
                      {item.created_at}
                    </td>

                    <td className="border px-2 py-1 whitespace-nowrap">
                      {!isEditing ? (
                        <>
                          <button
                            className="text-sm text-blue-600 mr-2"
                            onClick={() => startEdit(item)}
                          >
                            수정
                          </button>
                          <button
                            className="text-sm text-red-600"
                            onClick={() => handleDelete(item.id)}
                          >
                            삭제
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="text-sm text-green-600 mr-2"
                            onClick={() => saveEdit(item.id)}
                          >
                            저장
                          </button>
                          <button
                            className="text-sm text-gray-600"
                            onClick={() => setEditingId(null)}
                          >
                            취소
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}

              {solutions.length === 0 && (
                <tr>
                  <td className="border px-2 py-4 text-center" colSpan={8}>
                    데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

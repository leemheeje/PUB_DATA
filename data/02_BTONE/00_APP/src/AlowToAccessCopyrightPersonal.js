import React from 'react';

const PolicyPersonal = () => {

	return (
		<>
			<div className="text">
				<div className="box">
					<div>
						(주)비티원(이하 “회사”라 함)은 정보통신서비스 제공자로서 ooo서비스(이하 “서비스”라 함)와 관련하여 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법 등 관련법령에 따라 개인정보를 수집, 이용 및 제공함에 있어 이용자의 권리를 보호하고 관련 고충을 신속, 원활히 처리하기 위하여 다음과 같은 개인정보취급방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.
					</div>
				</div>
				<div className="box">
					<div className="bold">1. 개인정보의 수집이용</div>
					<div>
						가. 수집하는 개인정보의 항목
						회사는 서비스 사용, 원활한 고객상담, 각종 서비스의 제공을 위해 최초 서비스 사용시 아래와 같은 개인정보를 수집하고 있습니다.
						<table>
							<colgroup>
								<col />
								<col style={{ width: '40%' }} />
								<col />
							</colgroup>
							<thead>
								<tr>
									<th>구분</th>
									<th>수집이용목적</th>
									<th>수집항목</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td rowSpan="3">회원관리</td>
									<td>회원가입</td>
									<td>필수정보: 휴대전화번호, 비밀번호, CI
									부가정보: 이름, 성별, 전자우편주소, 거주지, 생년월일, CI	목적달성후 지체없이 파기(단, 관련법령 및 회사정책에 따라 별도 보관되는 정보는 예외)</td>
								</tr>
								<tr>
									<td>사업자회원가입, 서비스이용료징수, 세금계산서 발행, 정산대금입금</td>
									<td>사업자등록번호, 사업자명, 대표자명, 담당자명, 전자우편주소, 은행계좌정보, 신용카드정보</td>
								</tr>
								<tr>
									<td>문의(회원상담, 제휴상담 등)</td>
									<td>전자우편주소, 휴대전화번호, 이름</td>
								</tr>
								<tr>
									<td rowSpan="2">서비스이용</td>
									<td>포장주문, 테이블주문, 예약, 줄서기, 포인트 적립/사용, 쿠폰 사용, 전자영수증 발급, 알림서비스</td>
									<td>이름, 성별, 비밀번호, 휴대전화번호, 전자우편주소, 거주지, 생년월일, CI</td>
								</tr>
								<tr>
									<td>신규서비스개발, 맞춤서비스제공 및 마케팅 , 서비스 이용 통계 및 설문</td>
									<td>휴대전화번호, 성별, 전자우편주소, 생년월일</td>
								</tr>
								<tr>
									<td>생성정보</td>
									<td>회원관리, 서비스이용 및 부정거래 기록확인, 서비스 이용실적과 상담문의 정보의 통계 및 분석</td>
									<td>수집한 모든 개인정보 항목 서비스 이용 시 생성기록, 쿠키, 서비스이용기록(방문일시, 구매내역, 결제금액, 거래일시 등 영수증정보 일체), 결제수단, 신용카드번호(일부), 카드사명, UUID, 휴대폰 장치 아이디, 제휴사, 위치정보</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div className="box">
					<div className="bold">2. 개인정보 수집 방법</div>
					<div>
						회사는 다음과 같은 방법으로 개인정보를 수집합니다.<br />
						•	매장 내 설치된 키오스크와 태블릿을 통한 이용자의 자발적인 정보입력<br />
						•	매장 점원이 결제기기를 통하여 이용자에 대한 정보 수집(이용자 성명과 생년월일, 이메일 주소는 이용자의 동의가 있는 경우에 한함)<br />
						•	모바일앱 내 회원가입 시 휴대폰 본인인증을 통한 이용자의 자발적인 정보입력<br />
						•	기타 이용자의 자발적 제공을 통한 수집

					</div>
				</div>

				<div className="box">
					<div className="bold">3. 개인정보 수집 목적</div>
					<div>
						가. ㅇㅇㅇ포인트 및 쿠폰 기본 기능의 제공<br />
						회사는 매장 내 설치 된 키오스크와 태블릿, 모바일앱에서 이용자가 자발적으로 휴대전화번호를 입력하면 해당 휴대전화번호로 매장의 적립 및 사용 혜택을 받을 수 있는 포인트 및 쿠폰 서비스를 제공합니다. 이용자가 매번 휴대전화번호 입력 시 회사의 개인정보취급방침과 이용약관을 확인할 수 있으며, 이에 동의할 경우에 서비스를 사용할 수 있습니다. 또한 회사는 이용자의 휴대전화번호 입력 시 개인식별을 위한 ㅇㅇㅇ 멤버십 계정으로 사용하게 됩니다. 이용자의 휴대전화번호 외의 정보는 아래 예시된 사항을 포함하여 이용자가 포인트 및 쿠폰을 사용하는데 있어서 개인식별을 하기 위함이고, 추가 기능 및 서비스를 활용하기 위해서입니다.<br />
						•	서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산 : 컨텐츠 제공, 특정 맞춤 서비스 제공, 물품배송 또는 청구서 등 발송, 본인인증, 구매 및 요금 결제, 요금추심<br />
						•	회원관리: 회원제 서비스 이용 및 제한적 본인 확인제에 따른 본인확인, 개인식별, 불량회원((주)비티원 이용약관 제26조 위반 등으로 인하여 제31조에 따라 계약해지된 영구이용정지 회원)의 부정 이용방지와 비인가 사용방지, 가입의사 확인, 가입 및 가입횟수 제한, 만14세 미만 아동 개인정보 수집 시 법정 대리인 동의여부 확인, 추후 법정 대리인 본인확인, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달<br />
						나. 신규 서비스 개발 및 마케팅•광고에의 활용<br />
						•	신규 서비스 개발 및 맞춤 서비스 제공, 통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 이벤트 및 광고성 정보 제공 및 참여기회 제공, 접속빈도 파악, 회원의 서비스이용에 대한 통계

					</div>
				</div>

				<div className="box">
					<div className="bold">4. 개인정보의 보유 및 이용기간</div>
					<div>
						이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.<br />
						가. 회사 내부 방침에 의한 정보보유 사유<br />
						•	부정이용기록<br />
						•	보존 이유 : 부정 이용 방지<br />
						•	보존 기간 : 1년<br />
						나. 관련법령에 의한 정보보유 사유<br />
						상법, 전자상거래 등에서의 소비자보호에 관한 법률 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다. 이 경우 회사는 보관하는 정보를 그 보관의 목적으로만 이용하며 보존기간은 아래와 같습니다.
						<table>
							<colgroup>
								<col style={{ width: '40%' }} />
								<col />
							</colgroup>
							<thead>
								<tr>
									<th>보존근거</th>
									<th>목적</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td rowSpan="3">전자상거래 등에서의 소비자 보호에 관한 법률</td>
									<td>계약 또는 청약철회 등에 관한 기록</td>
								</tr>
								<tr>
									<td>대금결제 및 재화 등의 공급에 관한 기록</td>
								</tr>
								<tr>
									<td>소비자의 불만 또는 분쟁처리에 관한 기록</td>
								</tr>
								<tr>
									<td>전자금융거래법</td>
									<td>전자금융거래기록 확인</td>
								</tr>
								<tr>
									<td>통신비밀보호법</td>
									<td>법원의 영장을 받아 수사기관이 요청시 제공</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div className="box">
					<div className="bold">5. 개인정보 파기절차 및 방법</div>
					<div>
						이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 회사의 개인정보 파기절차 및 방법은 다음과 같습니다.<br />
						가. 파기절차<br />
						•	이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조)일정 기간 저장된 후 파기됩니다.<br />
						•	동 개인정보는 법률에 의한 경우가 아니고서는 보유되는 이외의 다른 목적으로 이용되지 않습니다.<br />
						나. 파기방법<br />
						•	종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.<br />
						•	전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.

					</div>
				</div>

				<div className="box">
					<div className="bold">6. 개인정보 자동 수집 장치의 설치/운영 및 거부에 관한 사항</div>
					<div>
						회사는 계정정보를 생성하기 위해 이용자가 ㅇㅇㅇ포인트 스마트폰 앱을 실행시 기기식별번호 (디바이스 아이디 또는 IMEI)를 자동으로 수집하게 됩니다. 또한 추후 친구자동등록이나 친구추천 등의 기본기능을 제공하기 위하여 관련 법령을 준수하여 이용자의 전화기 내의 전화번호부에 저장되어 있는 제3자의 전화번호를 자동으로 수집할 수 있습니다.
					</div>
				</div>

				<div className="box">
					<div className="bold">7. 개인정보의 제3자 제공</div>
					<div>
						회사는 이용자들의 개인정보를 3. 개인정보 수집 목적에서 고지한 범위 내에서 사용하며, 이용자의 사전 동의 없이는 동 범위를 초과하여 이용하거나 원칙적으로 이용자의 개인정보를 외부에 공개하지 않습니다. 단, 보다 나은 서비스 제공을 위하여 개인정보를 제휴사에게 제공하거나 공유할 필요가 있는 경우 제공 또는 공유할 정보의 항목 및 제휴사명, 목적, 기간 등을 명시하여 회원에게 동의를 구하는 절차를 거치게 되며, 동의하지 않은 경우에는 제3자에게 제공 또는 공유하지 않습니다.<br />
						아래의 경우에는 회원의 정보 제공 동의를 얻지 아니하고 제3자에게 개인정보를 제공할 수 있습니다.<br />
						•	다른 법률에 특별한 규정이 있는 경우<br />
						•	정보주체 또는 법정대리인이 의사표시를 할 수 없는 상태에 있거나 주소불명 등으로 사전 동의를 받을 수 없는 경우로서 명백히 정보주체 또는 제3자의 급박한 생명, 신체, 재산의 이익을 위하여 필요하다고 인정되는 경우<br />
						•	통계작성 및 학술연구 등의 목적을 위하여 필요한 경우로서 특정 개인을 알아볼 수 없는 형태로 개인정보를 제공하는 경우<br />
						•	정보통신서비스의 제공에 따른 요금정산을 위하여 필요한 경우<br />
						•	정보통신망 이용촉진 및 정보보호 등에 관한 법률 또는 다른 법률에 특별한 규정이 있는 경우<br />
						회사는 이용자에 대하여 보다 더 질 높은 서비스 제공 등을 위해 공의를 하신 이용자의 개인정보를 아래와 같이 제3자에게 제공하고 있습니다.
						<table>
							<colgroup>
								<col />
								<col style={{ width: '40%' }} />
								<col />
							</colgroup>
							<thead>
								<tr>
									<th>제공받는 자 1</th>
									<th>제공목적</th>
									<th>제공정보</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>서비스 가맹점 또는 브랜드</td>
									<td>브랜드 멤버십 혜택 및 이벤트를 진행하기 위하여</td>
									<td>전화번호, 서비스 이용기록, 생일, 성별, 이름</td>
								</tr>
								<tr>
									<td>페이스북 2</td>
									<td>페이스북 및 인스타그램의 기능을 활용하여 ㅇㅇㅇ 포인트 회원에게 ㅇㅇㅇ 포인트 가맹점의 상품 및 쿠폰을 소개하는 서비스를 제공하기 위하여</td>
									<td>전화번호</td>
								</tr>
							</tbody>
						</table>
						<div className="gray">
							1. 서비스의 개인정보를 제공 받는 자는 1) 이용자 방문 가맹점 및 2) 이용자가 제3자 정보 제공에 동의한 가맹점에 한정되며, 그러한 가맹점의 변동에 따른 개인정보취급방침의 수시개정이 어려워 가맹점을 페이지 링크로 명시합니다.<br />
							2. 페이스북은 ㈜(주)비티원으로부터 제공받는 전화번호를 공식적인 암호화 기술(Hashing) 처리하여 다른 용도로 사용하지 않고, 원칙적으로 ㈜(주)비티원과의 계약 종료 즉시 삭제합니다.

						</div>
					</div>
				</div>

				<div className="box">
					<div className="bold">8. 개인정보의 취급 위탁</div>
					<div>
						회사는 서비스 향상을 위해서 아래와 같이 개인정보를 위탁하고 있으며, 관계 법령에 따라 위탁계약 시 개인정보가 안전하게 관리될 수 있도록 필요한 사항을 규정하고 있습니다.
						회사의 개인정보 위탁처리 기관 및 위탁업무 내용은 아래와 같습니다.
						<table>
							<colgroup>
								<col style={{ width: "23%" }} />
								<col />
							</colgroup>
							<thead>
								<tr>
									<th>수탁업체</th>
									<th>위탁업무 내용</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>㈜</td>
									<td>제품의 A/S 접수 및 상담, 고객만족도조사, 민원처리, 해피콜(사후확인, 설치 배송안내 등) 등 콜센터 업무일체</td>
								</tr>
								<tr>
									<td>㈜문자천국</td>
									<td>적립확인 문자, ㅇㅇㅇ 포인트 서비스 공지사항, 또는 문자 쿠폰 전송 시 SMS, LMS, MMS 등의 문자를 전송</td>
								</tr>
								<tr>
									<td>CJ대한통운㈜</td>
									<td>가맹점주를 위한 서비스 패키지 배송</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div className="box">
					<div className="bold">9. 개인정보의 기술적/관리적 보호 대책</div>
					<div>
						회사는 이용자들의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적/관리적 대책을 강구하고 있습니다.<br />
						가. 해킹 등에 대비한 대책<br />
						회사는 해킹이나 컴퓨터 바이러스 등에 의해 회원의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다. 개인정보의 훼손에 대비해서 자료를 수시로 백업하고 있고, 최신 백신프로그램을 이용하여 이용자들의 개인정보나 자료가 누출되거나 손상되지 않도록 방지하고 있으며, 암호화통신 등을 통하여 네트워크상에서 개인정보를 안전하게 전송할 수 있도록 하고 있습니다. 그리고 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있으며, 기타 시스템적으로 보안성을 확보하기 위한 가능한 모든 기술적 장치를 갖추려 노력하고 있습니다.<br />
						나. 취급 직원의 최소화 및 교육<br />
						회사의 개인정보관련 취급 직원은 담당자에 한정시키고 있고 이를 위한 별도의 비밀번호를 부여하여 정기적으로 갱신하고 있으며, 담당자에 대한 수시 교육을 통하여 (주)비티원 개인정보취급방침의 준수를 항상 강조하고 있습니다.<br />
						다. 개인정보보호전담기구의 운영<br />
						그리고 사내 개인정보보호전담기구 등을 통하여 (주)비티원 개인정보취급방침의 이행사항 및 담당자의 준수여부를 확인하여 문제가 발견될 경우 즉시 수정하고 바로 잡을 수 있도록 노력하고 있습니다. 단, 이용자 본인의 부주의나 인터넷상의 문제로 개인정보가 유출되어 발생한 문제에 대해 회사는 일체의 책임을 지지 않습니다.

					</div>
				</div>

				<div className="box">
					<div className="bold">10. 이용자 및 법정대리인의 권리와 그 행사방법</div>
					<div>
						•	이용자 및 법정 대리인은 언제든지 등록되어 있는 자신 혹은 당해 만 14세 미만 아동의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수도 있습니다.<br />
						•	이용자 혹은 만 14세 미만 아동의 개인정보 조회, 수정을 위해서는 서비스내 내 프로필 변경을, 가입해지(동의철회)를 위해서는 서비스내 계정삭제를 클릭하여 직접 열람, 정정 또는 탈퇴가 가능합니다.<br />
						•	혹은 개인정보관리책임자에게 서면, 전화 또는 이메일로 연락하시면 지체 없이 조치하겠습니다.<br />
						•	이용자가 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3 자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체 없이 통지하여 정정이 이루어지도록 하겠습니다.<br />
						•	회사는 이용자 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보는 4. 개인정보의 보유 및 이용기간에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.

					</div>
				</div>

				<div className="box">
					<div className="bold">11. 개인정보수집, 이용, 제공에 대한 동의 철회</div>
					<div>
						이용자는 회원가입 등을 통해 개인정보의 수집, 이용, 제공에 대한 동의내용을 언제든지 철회할 수 있습니다. 동의 철회(회원탈퇴)를 하고자 할 경우에는 고객센터 또는 스마트폰 앱을 통해 직접 신청할 수 있습니다.
					</div>
				</div>

				<div className="box">
					<div className="bold">12. 개인정보의 열람 및 정정</div>
					<div>
						이용자(만 14세 미만 아동회원의 경우 그 법정대리인 포함)는 언제든지 본 서비스에 등록되어 있는 이용자의 개인정보를 열람하거나 정정할 수 있습니다. 개인정보를 열람하거나 정정을 하고자 할 경우에는 회사의 고객센터, 스마트폰 앱 내 이용자 프로필정보 보기, 개인정보관리책임자에게 서면, 전화 또는 Email로 연락하여 주시면 지체없이 조치하겠습니다.<br />
						회사는 이용자가 이용자의 요구에 성실하게 대응하고, 해당 개인정보에 오류가 있거나 보존기간을 경과한 것이 판명되는 등 정정/삭제를 할 필요가 있다고 인정되는 경우에는 지체없이 정정/삭제 조치를 합니다.

					</div>
				</div>

				<div className="box">
					<div className="bold">13. 발신번호 등록⋅관리, 부정가입 방지</div>
					<div>
						가. 회사의 의무<br />
						•	회사는 발신번호의 변작방지를 위해 번호인증을 통한 발신번호 사전등록서비스를 제공⋅운영 합니다.<br />
						•	회사는 이용고객의 회원가입 시 타인의 명의를 도용한 부정가입을 방지하기 위해 본인인증 서비스 사업자가 제공하는 인증방법 또는 대면인증을 통해 본인인증서비스를 제공⋅운영 합니다.<br />
						•	회사는 이용자가 발신번호 사전등록 및 본인인증절차를 거친후 서비스를 제공합니다.<br /><br />
						나. 매장의 의무<br />
						•	매장은 발신번호의 변작방지를 위해 번호인증 통해 발신번호 사전등록 후 서비스를 이용하셔야 합니다.<br />
						•	매장은 회원가입 시 부정가입 방지를 위해 본인인증서비스 사업자가 제공하는 인증방법으로 본인인증을 거친 후 서비스를 이용하셔야 합니다.

					</div>
				</div>

				<div className="box">
					<div className="bold">14. 거짓으로 표시된 전화번호를 송신한 자의 해당 회선에 대한 전기통신역무 제공의 중지를 위한 처리방안</div>
					<div>
						과학기술정보통신부 (거짓으로 표시된 전화번호로 인한 이용자 피해 예방 등에 관한) 고시 제 4조, 제5조, 제7조에 따라 거짓으로 표시된 전화번호를 송신한 자는 고객사(회원)의 회선을 제공 중지 할 수 있습니다.
					</div>
				</div>

				<div className="box">
					<div className="bold">15. 의견수렴 및 불만처리</div>
					<div>
						회사가 개인정보취급방침을 지키지 않는다고 판단되면, 개인정보 관리책임자 또는 개인정보 관리담당자에게 알려주십시오. 지적하신 문제를 조속히 확인하고 수정이 필요한 경우에는 최대한 빠른 시간 내에 조치하도록 노력하겠습니다. 회사는 이용자들의 개인정보와 관련하여 이용자들의 의견을 수렴하고 있으며 불만을 처리하기 위하여 모든 절차와 방법을 마련하고 있습니다.<br />
						가. 이용자 불만형태별 처리절차 및 처리기간<br />
						이용자의 불만사항 접수 및 처리절차는 다음과 같이 시행합니다.<br />
						•	불만사항 접수는 일반전화, 이메일에 의한 방법으로 접수합니다.<br />
						•	불만사항 처리는 운영자가 직접 전화하여 즉시 처리하는 것을 원칙으로 이메일 및 서면에 의한 민원 접수 처리는 영업일 기준 24시간 이내에 처리합니다.
						<table>
							<colgroup>
								<col />
								<col />
								<col />
								<col />
								<col />
							</colgroup>
							<thead>
								<tr>
									<th>불만</th>
									<th>유형</th>
									<th>원인</th>
									<th>처리절차</th>
									<th>처리기간</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td rowSpan="3">서비스 관련</td>
									<td>통신장애</td>
									<td>회사의 귀책사유</td>
									<td>대고객 사과 및 품질개선</td>
									<td>영업일 기준 24시간 이내</td>
								</tr>
								<tr>
									<td rowSpan="2">시스템 장애</td>
									<td>회사의 귀책사유</td>
									<td>대고객 사과 및 품질개선</td>
									<td>영업일 기준 24시간 이내</td>
								</tr>
								<tr>
									<td>매장(이용자)의 귀책사유</td>
									<td>대고객 설명</td>
									<td>영업일 기준 24시간 이내</td>
								</tr>
								<tr>
									<td rowSpan="3">요금관련</td>
									<td rowSpan="3">청구요금 이의</td>
									<td rowSpan="2">회사의 귀책사유</td>
									<td>과금전 : 비과금 요청</td>
									<td rowSpan="2">영업일 기준 24시간 이내</td>
								</tr>
								<tr>
									<td>과금후 : 환불</td>
								</tr>
								<tr>
									<td>매장(이용자)의 귀책사유</td>
									<td>대고객 설명</td>
									<td>영업일 기준 24시간 이내</td>
								</tr>
								<tr>
									<td>개인정보관련</td>
									<td>개인정보 침해</td>
									<td>회사/ 매장(이용자)의 귀책사유</td>
									<td>상세 절차 ‘나’ 항목에 명시</td>
									<td>즉시</td>
								</tr>
							</tbody>
						</table>
						나. 개인정보 침해에 대한 신고 및 상담절차<br />
						또한 개인정보 침해에 대한 신고, 상담이 필요하신 경우에는 한국정보보호진흥원 (KISA) 개인정보 침해신고센터로 문의하시기 바랍니다.<br />
						이용자의 개인정보침해를 통한 금전적, 정신적 피해를 입으신 경우에는 개인정보분쟁 조정위원회에 피해구제를 신청할 수 있습니다.<br />
						•	한국인터넷진흥원 개인정보침해신고센터 : (국번없이) 118<br />
						•	대검찰청 사이버범죄수사단 : 02-3480-3571<br />
						•	경찰청 사이버테러대응센터 : 1566-0112

					</div>
				</div>

				<div className="box">
					<div className="bold">16. 기타</div>
					<div>
						ㅇㅇㅇ와 제휴되어 있는 서비스, 스마트폰 앱, 웹사이트가 개인정보를 수집하는 행위에 대해서는 회사의 개인정보취급방침이 적용되지 않습니다.
					</div>
				</div>

				<div className="box">
					<div className="bold">17. 고지의 의무</div>
					<div>
						현 개인정보취급방침의 내용 추가, 삭제 및 수정이 있을 시에는 시행일자 최소 7일전부터 회사 웹사이트 http://.com 또는 회사 서비스 내 설정 화면을 통해 공고할 것입니다.
					</div>
				</div>

				<div className="box">
					<div className="bold">18. 개인정보관리책임자 및 담당자의 연락처</div>
					<div>
						귀하께서는 회사의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보관리책임자 혹은 담당부서로 신고하실 수 있습니다. 회사는 이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다.<br />
						개인정보 관리책임자<br />
						•	이 름 : 000<br />
						•	전 화 : 0000-0000<br />
						•	메 일 :<br />
						기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.<br />
						•	개인정보침해신고센터<br />
						o	http://www.118.or.kr / 118<br />
						•	정보보호마크인증위원회<br />
						o	http://www.eprivacy.or.kr / 02-580-0533, 02-580-0534<br />
						•	대검찰청 첨단범죄수사과<br />
						o	http://www.spo.go.kr / 02-3480-2000<br />
						•	경찰청 사이버테러대응센터<br />
						o	http://www.ctrc.go.kr / 02-392-0330

					</div>
				</div>

				<div className="box">
					<div className="bold">19. 시행일자</div>
					<div>
						•	공고일 : 2020년 07월 01일<br />
						•	시행일 : 2020년 07월 01일

					</div>
				</div>
			</div>
		</>
	)
}
export default PolicyPersonal;
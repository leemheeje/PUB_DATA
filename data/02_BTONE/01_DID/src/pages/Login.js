import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { login } from 'actions';
import Form from '../components/Form';
import PopupToast from 'components/PopupToast';
import UiButton from '../components/UiButton';
import 'assets/css/login.scss';

const Login = (props) => {

    const { onLogin, userId, userPw, history } = props;

    const [keyTarget, setKeyTarget] = useState(''); //키패드 타겟체크
    const [keyPadVisible, setKeyPadVisible] = useState(''); //키패드 토글
    const [focusInput, setFocusInput] = useState(''); //포커스 설정


    //키패드 리스트
    const keyList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];

    //키패드 열기 및 타겟체크
    const keypadOpen = (e) => {
        if (e.target.type == 'text') {
            setKeyTarget('text')
        } else {
            setKeyTarget('password')
        }
        setKeyPadVisible('active');
    }

    //키패드 닫기
    const keyPadClose = (e) => {
        setKeyPadVisible('');
        setKeyTarget('')
    }

    const [idText, setIdText] = useState([]); //입력된 id 배열에 담기
    const [pwText, setPwText] = useState([]); //입력된 password 배열에 담기
    const [idResult, setIdResult] = useState(''); //id 결과값
    const [pwResult, setPwResult] = useState(''); //password 결과값


    //id,password 배열 합치기
    useEffect(() => {
        setIdResult(idText.join(""));
        setPwResult(pwText.join(""));
    }, [idText, pwText])


    //키패드 입력
    const kewDown = (e) => {
        let targetValue = e.target.value;
        if (keyTarget == 'text') {
            setIdText(idText => ([...idText, targetValue]))
        } else {
            setPwText(pwText => ([...pwText, targetValue]))
        }
    }

    //키패드 삭제
    const keyPadDel = (e) => {
        if (keyTarget == 'text') {
            setIdText(idText.slice(0, idText.length - 1))
        } else {
            setPwText(pwText.slice(0, pwResult.length - 1))
        }
    }


    //로그인
    const loginSubmit = () => {

        //유효성체크
        if (idText.length <= 0) {
            setPopupToast(
                <PopupToast closeCallback={handlerToastCloseCallback}>
                    아이디를 입력해주세요
                </PopupToast>
            );
            setKeyTarget('text');
            setKeyPadVisible('active');
            return false;
        } else if (pwText.length <= 0) {
            setPopupToast(
                <PopupToast closeCallback={handlerToastCloseCallback}>
                    비밀번호를 입력해주세요
                </PopupToast>
            );
            setKeyTarget('password');
            setKeyPadVisible('active');
            return false;
        }

        //임시로 store에 저장
        //onLogin(idResult, pwResult);


        //메인으로 이동
        history.push('/main');
    }


    const [popupToast, setPopupToast] = useState(''); // 토스트 팝업
    
    const handlerToastCloseCallback = () => {
		setPopupToast('');
	}


    return (
        <div id="login">
            <div className="front">
                <div className="in">
                    <div className="logoBox">
                        <img src={require('../assets/images/login/logo.png')} alt="LOGO" />
                    </div>

                    <div className={`loginBox ${keyTarget}`}>
                        <div className="line">
                            <Form type="text" id="idValue" readOnly placeholder="아이디" value={idResult} onClick={keypadOpen} />
                        </div>
                        <div className="line">
                            <Form type="password" id="pwValue" readOnly placeholder="비밀번호" value={pwResult} onClick={keypadOpen} />
                        </div>
                        <div className="btnLogin">
                            <button onClick={loginSubmit}>로그인</button>
                        </div>
                        <div className="loginOption">
                            <div className="left"><Form type="checkbox" id="autoLogin" label="자동 로그인" /></div>
                            <div className="right"><Form type="checkbox" id="idSave" label="아이디 저장" /></div>
                        </div>
                    </div>

                </div>
            </div>



            <div className={`keypad ${keyPadVisible}`}>
                <div className="keyList">
                    <ul>
                        {
                            keyList.map((value, index) => {
                                return (/*  */
                                    <li key={index} data-value={value}>
                                        <button onClick={kewDown} value={value}>{value}</button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <button className="btnDel" onClick={keyPadDel}>삭제</button>
                </div>
                <div className="btnClose">
                    <button onClick={keyPadClose}>닫기</button>
                </div>
            </div>

            {/* 토스트 팝업 */}
			{popupToast}

        </div>
    )
}



let mapStateToProps = (state) => {
    return {
        userId: state.loginApp.userId,
        userPw: state.loginApp.userPw
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (value1, value2) => dispatch(login(value1, value2)),
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Login);
import { useState } from "react";


const FormValidation = () =>{
    const[users] = useState([
        {UserId:"gkp"},
        {User:'john'}
    ])
   //1
   const[userDetails, setUserDetails] = useState({UserId:"", Password:"", City:""});
   const[cityMsg, setCityMsg] = useState('');

   //2 for Verify UserId
   const[userMsg, setUserMsg] = useState('');
   const [isUserValid, setUserValid] = useState(false);

   //3 verifyPassword
   const[pwdMsg, setPwdMsg] = useState('');

   //4 Verify CapsStatus
   const[capsStatus, setCapsStatus] = useState('')




   function VerifyPassword(e){
         if(e.target.value.match(/(?=.*[A-Z])\w{4,10}/))
        {
            setPwdMsg('Strong Password');
        } else {
            if(e.target.value.length<4){
                setPwdMsg('Poor Password');
            } else {
                setPwdMsg('Weak Password');
            }
        }
   }
   function HidePasswordMsg(){
        setPwdMsg('');
        setCapsStatus(false);
    }

    function VerifyCaps(e){
        if(e.keyCode>=65 && e.keyCode<=90 || e.which>=65 && e.which<=90){
            setCapsStatus(true);
        } else{
            setCapsStatus(false);
        }
    }

   function HideUserMsg(e){
        if(e.target.value==""){
            setUserMsg("User I Required");
        }else{
            setUserMsg("");
        }
   }
    function VerifyUserId(e){
        for(var user of users){
            if(user.UserId==e.target.value){
                setUserMsg('User Id taken - Try Another');
                setUserValid(false)
                break;
            } else{
                setUserMsg('user id Available');
                setUserValid(true);
            }
        }
    }
    

   function HandleUserChange(e){
        setUserDetails({
            UserId:e.target.value,
            Passowrd:userDetails.Password,
            City:userDetails.City
        })
   }
   function HandlePasswordChange(e){
        setUserDetails({
            UserId:userDetails.UserId,
            Password:e.target.value,
            City:userDetails.City
        })
    }
   function VerifyCity(e){
        setUserDetails({
            UserId:userDetails.UserId,
            Password:userDetails.Password,
            City:e.target.value
        })    

        if(e.target.value=="value") {
            setCityMsg('Please Select a City');
        } else {
            setCityMsg('');
        } 
    }
    function RegisterClick(){
        alert(JSON.stringify(userDetails));
    }
    return(
        <>
            <dl>
                <dt>User Name</dt>
                <dd><input onBlur={HideUserMsg} onKeyUp={VerifyUserId} onChange={HandleUserChange} type="text" /></dd>
                <dd  className={(isUserValid==true)?'text-success':'text-danger'}>{userMsg}</dd>
                <dt>Password</dt>
                <dd><input onKeyPress={VerifyCaps}  onBlur={HidePasswordMsg} onKeyUp={VerifyPassword} onChange={HandlePasswordChange} type="password" /></dd>
                <dd>{pwdMsg}</dd>
                <dt>City</dt>
                <dd className={(capsStatus==true)?'d-block':'d-none'}>
                    <span className="text-warning">
                        <span className="bi bi-exclamation-triangle">
                    </span> Caps ON</span>
                </dd>    
                <dd>
                    <select onChange={VerifyCity}>
                        <option value="notcity">Select Your City</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Hyd">Hyd</option>
                    </select>
                </dd>
                <dd className="text-danger">{cityMsg}</dd>
            </dl>
            <button onClick={RegisterClick}>Register</button>
        </>
    )
}
export default FormValidation;
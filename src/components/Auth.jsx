const Auth = () => {
  return (
    <div>
      <input type="text" placeholder="User name"/>
      <input type="text" placeholder='Password'/>
      <div>
        <button style={{margin: '10px 0'}}>Войти</button>
      </div>
      <div>
        <a href="#" >Зарегистрироваться</a>
      </div>
    </div>
  )
}

export default Auth;


export  default  function Post({username,title,files,date}){

    return(
        <div className=' w-full my-4  flex shadow-2xl flex-col items-center rounded-xl bg-sky-700 sm:w-3/4'>
            <h1>{username}</h1>
        </div>
        )
}

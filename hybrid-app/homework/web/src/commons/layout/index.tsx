import HeaderGlobal from "./header";

export default function LayOut({children}) {

    return(
        <div>
            <HeaderGlobal/>
            <>{children}</>
        </div>
        
    )
}
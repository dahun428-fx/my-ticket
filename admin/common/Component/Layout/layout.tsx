const Layout = ({children}) => {

    return (
        <>
            <div>navbar</div>
            <>
                {children}
            </>
            <div>footer</div>
        </>
    )

}

export default Layout;
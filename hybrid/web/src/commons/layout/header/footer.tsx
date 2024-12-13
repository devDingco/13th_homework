export default function Footer({ children, isFixed }) {
    return (
        <>
            <div style={{ flex: 1 }} />
            <footer
                style={{
                    position: isFixed ? 'fixed' : 'static',
                    bottom: isFixed && 0,
                }}
            >
                {children}
            </footer>
        </>
    );
}

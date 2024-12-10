export default function Footer({ children, isFixed }) {
    return (
        <>
            <div style={{ flex: 1 }} />
            <footer
                style={{
                    width: '100vw',
                    height: '3rem',
                    margin: '0 auto 1.25rem auto',
                    padding: '.5rem 1.25rem',
                    position: isFixed ? 'fixed' : 'static',
                    bottom: isFixed && 0,
                }}
            >
                {children}
            </footer>
        </>
    );
}

export default function Footer({ children }) {
    return (
        <>
            <div style={{ flex: 1 }} />
            <footer
                style={{
                    width: '20rem',
                    height: '3rem',
                    backgroundColor: '#d4d3d3',
                }}
            >
                {children}
            </footer>
        </>
    );
}

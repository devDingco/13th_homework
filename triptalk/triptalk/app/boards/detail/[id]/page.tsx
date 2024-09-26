interface BoardDetailPageProps {
    params: {
        id: string;
    }
}

const BoardDetailPage = ( { params } : BoardDetailPageProps) => {
    const { id } = params;
    return(
        <div>
            {id}
        </div>
    );
};

export default BoardDetailPage;
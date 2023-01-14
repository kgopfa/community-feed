import styled from "styled-components";
import Link from "next/link";

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const PaginationLink = styled(Link).attrs((props: any) => props)`
    padding: 2%;
    margin: 1%;
    background: ${(props) => (!props.disabled ? 'orange' : 'lightGrey')};
    pointer-events: ${(props) => (!props.disabled ? 'all' : 'none')};
    cursor: ${(props) => (!props.disabled ? 'pointer' : 'not-allowed')};
    color: white;
    text-decoration: none;
    border-radius: 5px;
`;

function Pagination(props: any) {
    return (
        <PaginationContainer>
            <PaginationLink href={`?page=${parseInt(props.currentPage) - 1}`} disabled={props.currentPage <=1}>
                Previous
            </PaginationLink>
            <PaginationLink href={`?page=${parseInt(props.currentPage) + 1}`} disabled={!props.hasMore}>
                Next
            </PaginationLink>
        </PaginationContainer>
    );
}

export default Pagination;
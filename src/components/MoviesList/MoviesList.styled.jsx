import styled from 'styled-components';

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 200px);
  gap: 15px;

  list-style: none;
`;

export const Item = styled.li`
  padding: 10px;
  border: 1px solid #ccc;
`;

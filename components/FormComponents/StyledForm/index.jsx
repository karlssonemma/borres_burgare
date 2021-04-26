import styled from 'styled-components';
import theme from '../../../utils/theme';

export const StyledForm = styled.form`
    width: max-content;
    height: max-content;
    margin: ${props => props.theme.space[3]} 0;
    padding: ${props => props.theme.space[5]};
    border-radius: 10px;
    background-color: ${props => props.theme.colors.lightorange};
    display: flex;
    flex-direction: column;
`;
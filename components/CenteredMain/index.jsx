import styled from 'styled-components';
import theme from '../../utils/theme';

const CenteredMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: ${props => props.theme.space[5]};
`;

export default CenteredMain;
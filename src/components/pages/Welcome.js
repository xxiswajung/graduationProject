import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-scroll';

const Title = styled.h1`
  font-size: 40px;
  color: seagreen;
  letter-spacing: -1px;
  line-height: 50%;
   `;

const About = styled.p`
   font-size: 20px;
   color: gray;
   letter-spacing: 1px;
   text-align: right;
  `;
const Main = styled.div`
  top : 40%;
  left : 10%;
  position: absolute;
`;

function Welcome () {
  return(
    <Main><Container>
      <Fade duration={1000} delay={500} distance="30px">
        <Title><h1 className="title" >
          {'🗺️ Healthy People'}{' '}
          <span className="text-color-main"></span>
          <br />
        </h1></Title>
      </Fade>
      <Fade duration={1000} delay={1000} distance="30px">
      <About> <p className="subtitle">
          <span className="content">
            <Link to="about" smooth duration={1000}>
              {"내 주변에서 나에게"} <b style={{color:'black'}}>딱</b> {"맞는 식단을 추천 받으세요!"}
            </Link>
          </span>
        </p> </About>
      </Fade>
    </Container></Main>
  );
}

export default Welcome;
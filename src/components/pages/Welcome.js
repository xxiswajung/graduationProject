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
          {'πΊοΈ Healthy People'}{' '}
          <span className="text-color-main"></span>
          <br />
        </h1></Title>
      </Fade>
      <Fade duration={1000} delay={1000} distance="30px">
      <About> <p className="subtitle">
          <span className="content">
            <Link to="about" smooth duration={1000}>
              {"λ΄ μ£Όλ³μμ λμκ²"} <b style={{color:'black'}}>λ±</b> {"λ§λ μλ¨μ μΆμ² λ°μΌμΈμ!"}
            </Link>
          </span>
        </p> </About>
      </Fade>
    </Container></Main>
  );
}

export default Welcome;
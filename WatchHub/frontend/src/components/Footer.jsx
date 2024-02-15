import React from 'react';
import styled from 'styled-components';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BusinessIcon from '@mui/icons-material/Business';

const Container = styled.div`
  display: flex;
  background-color: #333;
  color: #f9f9f9;
  margin-top: 80px; /* Added margin for space */
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 40px; /* Adjusted padding */
`;

const Logo = styled.h1`
  margin-bottom: 20px;
`;

const Desc = styled.p`
  margin-bottom: 20px;
`;

const SocialContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px 40px; /* Adjusted padding */
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 250px;
  height: 70px;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>WatchHub</Logo>
        <Desc>
          WatchHub is an online platform offering a diverse collection of watches from popular brands, encompassing classic, sports, and smartwatch styles, with a commitment to quality and customer satisfaction.
        </Desc>
        <SocialContainer>
          <SocialIcon color="#3B5999"><FacebookOutlinedIcon /></SocialIcon>
          <SocialIcon color="#E4405F"><InstagramIcon /></SocialIcon>
          <SocialIcon color="#25D366"><WhatsAppIcon /></SocialIcon>
          <SocialIcon color="#1DA1F2"><TwitterIcon /></SocialIcon>
        </SocialContainer>
      </Left>
      <Right>
        <ContactItem>
          <BusinessIcon style={{ marginRight: "10px" }} /> Ernakulam South, Kerala, India , Pincode:682016
        </ContactItem>
        <ContactItem>
          <LocalPhoneIcon style={{ marginRight: "10px" }} />+91 9876543210
        </ContactItem>
        <ContactItem>
          <EmailIcon style={{ marginRight: "10px" }} />watchhub@gmail.com
        </ContactItem>
        <Payment src="https://t4.ftcdn.net/jpg/04/73/84/61/360_F_473846184_0k637f6855ZJqaulKqAmgJTEVGVibR1P.jpg" />
      </Right>
    </Container>
  );
};

export default Footer;

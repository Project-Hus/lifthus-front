import React, { useRef, useState } from 'react'
import { Input , styled , Checkbox, Button, FormGroup, FormControlLabel } from '@mui/material'
import { borderRadius } from '@mui/system'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Schedule from '../component/schedule';

const sex_option = ['Male' , 'Female']
const leg_length_option = ["상","중","하"]
const arm_length_option = ["상","중","하"]

const Home = () => {

    const [age , setAge] = useState(0)
    const [sex,setSex] = useState('Male')
    const [height,setHeight] = useState(0)
    const [squrt , setSqurt] = useState(0)
    const [dead,setDead] = useState(0)
    const [bodyFatPercentage , setBodyFatPercentage] = useState(0)
    const [armLength , setArmLength] = useState("상")
    const [legLength , setLegLength] = useState("상")
    const swiperRef = useRef()

    return (
        <FullPage>
            <PageContainer>
                <StyledSwiper
                    allowTouchMove={false}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper)=>{
                        (swiperRef).current = swiper
                    }}
                    slidesPerView={1}
                    >
                    <SwiperSlide>
                        <SwiperContainer>
                            <div>
                                성별
                            </div>
                            <CheckBoxContainer>
                                {sex_option.map((data)=>{
                                    return <FormControlLabel control={<Checkbox checked={sex === data} onChange={()=>{
                                        setSex(data)
                                    }}/>} label={data}/>
                                })}
                            </CheckBoxContainer>
                            <div>
                                팔 길이
                            </div>
                            <CheckBoxContainer>
                                {arm_length_option.map((data,index)=>{
                                    return <FormControlLabel control={<Checkbox checked={armLength === data} onChange={()=>{
                                        setArmLength(data)
                                    }}/>} label={data}/>
                                })}
                            </CheckBoxContainer>
                            <div>
                                다리 길이
                            </div>
                            <CheckBoxContainer>
                                {leg_length_option.map((data,index)=>{
                                    return <FormControlLabel control={<Checkbox checked={legLength === data} onChange={()=>{
                                        setLegLength(data)
                                    }}/>} label={data}/>
                                })}
                            </CheckBoxContainer>
                            <StyledInput placeholder='나이를 입력해 주세요'></StyledInput>
                            <div style={{height : 10}}/>
                            <StyledInput placeholder='신장을 입력해 주세요(Cm)'></StyledInput>
                            <div style={{height : 10}}/>
                            <StyledInput placeholder='몸무게를 입력해 주세요(Kg)'></StyledInput>
                            <div style={{height : 10}}/>
                            <StyledInput placeholder='체지방률을 입력해 주세요(%)'></StyledInput>
                            <div style={{height : 10}}/>
                            <StartButton onClick={()=>{
                                swiperRef.current.slideNext()
                            }}>
                                Start!
                            </StartButton>
                        </SwiperContainer>
                    </SwiperSlide>
                    <SwiperSlide style={{}}>
                        <SwiperContainer>
                            루틴 입력
                            <div style={{height : 10}}/>
                            <Schedule/>
                            <ButtonContainer>
                                <StartButton onClick={()=>{
                                    swiperRef.current.slidePrev()
                                }}>
                                    Back
                                </StartButton>
                                <div style={{width : 8}}/>
                                <StartButton onClick={()=>{
                                    swiperRef.current.slideNext()
                                }}>
                                    Start
                                </StartButton>
                            </ButtonContainer>
                        </SwiperContainer>
                    </SwiperSlide>
                </StyledSwiper>
            </PageContainer>
        </FullPage>
    )
}

const ButtonContainer = styled('div')(()=>({
    width : '100%',
    alignItems : 'flex-end',
    justifyContent : 'flex-start',
    display : 'flex',
    flex : 1,
}))

const StyledSwiper = styled(Swiper)(()=>({
    width : '100%',
    height : '100%',
    overflow : 'scroll'
}))

const CheckBoxContainer = styled(FormGroup)(() => ({
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center'
}))

const StyledInput = styled(Input)(()=>({
    width : '100%'
}))

const StartButton = styled(Button)(()=> ({
    backgroundColor : '#0067A3',
    borderRadius : 4,
    width : 50,
    height : 28,
    color : '#FFF'
}))

const FullPage = styled('div')(() => ({
    height : '100%',
    width : '100%',
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'center',
}))

const SwiperContainer = styled('div')(()=>({
    display : 'flex',
    height : '100%',
    height : '400px',
    flexDirection : 'column',
    alignItems : 'flex-start',
    justifyContent : 'flex-start',    
    overflowY : 'scroll'
}))

const PageContainer = styled('div')(() => ({
    maxWidth : 600,
    flex : 1,
    display : 'flex',
    flexDirection : 'column',
    alignItems : 'flex-start',
    justifyContent : 'flex-start',
    border : '1px solid #0067A3',
    padding : 20,
    borderRadius : 8,
}))



export default Home
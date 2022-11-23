import React, { useRef, useState } from 'react'
import { Input , styled , Checkbox, Button, FormGroup, FormControlLabel } from '@mui/material'
import { borderRadius } from '@mui/system'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Schedule from '../component/schedule';


const arm_length_option = {
    "long" : '상',
    "medium" : "중",
    "short" : "하",
}

const sex_option = {
    "여" : 'female',
    "남" : "male",
}

const leg_length_option = {
    "long" : '상',
    "medium" : "중",
    "short" : "하",
}

const statics = Array(24).fill({
}).map((i)=>{
    return {
        weight: 0,
        fat_rate: 0,
        program: 0, // 그 주에 한 프로그램 인덱스
        squat: 0, // 그 주의 프로그램을 끝내고 스쿼트, 벤치, 데드 무게
        benchpress: 0,
        deadlift: 0
    }
})


const Home = () => {

    const [age , setAge] = useState(0)
    const [sex,setSex] = useState('Male')
    const [height,setHeight] = useState()
    const [squrt , setSqurt] = useState()
    const [dead,setDead] = useState(0)
    const [bodyFatPercentage , setBodyFatPercentage] = useState(0)
    const [armLength , setArmLength] = useState("상")
    const [legLength , setLegLength] = useState("상")
    const [schedules , setSchedules ] = useState(statics)
    const swiperRef = useRef()

    const handleAge = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setAge(e.target.value);
        }else {
            setAge(0)
        }
    }

    const handleHeight = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setHeight(e.target.value);
        }else{
            setHeight(0)
        }
    }

    const handleSchedules = () => {

    }

    const updateSchedules = () => {

    }

    const addSchedules = () => {

    }

    const getTraingResult =  () => {

    }

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
                    <SwiperSlide style={{height : '400px'}}>
                        <SwiperContainer>
                            <div style={{height : 20}}/>
                            <div>
                                성별
                            </div>
                            <CheckBoxContainer>
                            {Object.keys(sex_option).map((keys)=>{
                                return <FormControlLabel control={<Checkbox checked={sex === sex_option[keys]} onChange={()=>{
                                    setLegLength(sex_option[keys])
                                }}/>} label={keys}/>                                    
                            })}
                            </CheckBoxContainer>
                            <div>
                                팔 길이
                            </div>
                            <CheckBoxContainer>
                            {Object.keys(arm_length_option).map((keys)=>{
                                return <FormControlLabel control={<Checkbox checked={armLength === keys} onChange={()=>{
                                    setArmLength(keys)
                                }}/>} label={arm_length_option[keys]}/>                                    
                            })}
                            </CheckBoxContainer>
                            <div>
                                다리 길이
                            </div>
                            <CheckBoxContainer>
                            {Object.keys(leg_length_option).map((keys)=>{
                                return <FormControlLabel control={<Checkbox checked={legLength === keys} onChange={()=>{
                                    setLegLength(keys)
                                }}/>} label={leg_length_option[keys]}/>                                    
                            })}
                            </CheckBoxContainer>
                            <div style={{height : 30}}/>
                            <StyledInput inputMode='numeric' value={age} onChange={handleAge} placeholder='나이를 입력해 주세요'></StyledInput>
                            <div style={{height : 10}}/>
                            <StyledInput inputMode='numeric' value={height} onChange={handleHeight} placeholder='신장을 입력해 주세요(Cm)'></StyledInput>
                            <div style={{height : 10}}/>
                            <ButtonContainer>
                                <StartButton onClick={()=>{
                                    swiperRef.current.slideNext()
                                }}>
                                    Start!
                                </StartButton>
                            </ButtonContainer>
                        </SwiperContainer>
                    </SwiperSlide>
                    <SwiperSlide style={{}}>
                        <SwiperContainer>
                            루틴 입력
                            <div style={{height : 10}}/>
                            <Schedule schedules={schedules} handleSchedules={setSchedules}/>
                            <div style={{height : 30}}/>
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
    height : '100%',
    alignItems : 'flex-end',
    justifyContent : 'flex-start',
    display : 'flex',
    flex : 1,
}))

const StyledSwiper = styled(Swiper)(()=>({
    display : 'flex',
    flex : 1,
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
    flex : 1,
    height : '100%',
    flexDirection : 'column',
    alignItems : 'flex-start',
    justifyContent : 'flex-start',    
    overflowY : 'scroll',
}))

const PageContainer = styled('div')(() => ({
    maxWidth : 1000,
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
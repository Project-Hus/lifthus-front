import React, { useRef, useState } from 'react'
import { Input , styled , Checkbox, Button, FormGroup, FormControlLabel } from '@mui/material'
import { borderRadius } from '@mui/system'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ScheduleItem from '../component/scheduleItem';
import Result from '../component/result';
import Logo from '../logo.svg';



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
}).map((i,index)=>{
    return {
        id : index,
        weight: 0,
        fat_rate: 0,
        program: 0, // 그 주에 한 프로그램 인덱스
        squat: 0, // 그 주의 프로그램을 끝내고 스쿼트, 벤치, 데드 무게
        benchpress: 0,
        deadlift: 0
    }
})


const Home = () => {

    const [age , setAge] = useState()
    const [sex,setSex] = useState('Male')
    const [height,setHeight] = useState()
    const [armLength , setArmLength] = useState("상")
    const [legLength , setLegLength] = useState("상")
    const [schedules , setSchedules ] = useState(statics)
    const swiperRef = useRef()

    // const [program, setProgram] = useState('')
    // const [weight , setWeight] = useState()
    // const [fatPerWeight , setFatPerWeight] = useState()
    // const [squat , setSquat] = useState()
    // const [benchpress , setBenchpress] = useState()
    // const [deadlift , setDeadlift] = useState()

    const [input1,setInput1] = useState({})

    const [input2,setInput2] = useState({})

    const [input3,setInput3] = useState({})

    const [input4,setInput4] = useState({})

    const [input5,setInput5] = useState({})

    const [input6,setInput6] = useState({})

    const [input7,setInput7] = useState({})

    const [input8,setInput8] = useState({})

    const [input9,setInput9] = useState({})

    const [input10,setInput10] = useState({})

    const [input11,setInput11] = useState({})

    const [input12,setInput12] = useState({})

    const [input13,setInput13] = useState({})

    const [input14,setInput14] = useState({})

    const [input15,setInput15] = useState({})

    const [input16,setInput16] = useState({})

    const [input17,setInput17] = useState({})

    const [input18,setInput18] = useState({})

    const [input19,setInput19] = useState({})

    const [input20,setInput20] = useState({})

    const [input21,setInput21] = useState({})

    const [input22,setInput22] = useState({})

    const [input23,setInput23] = useState({})

    const [input24,setInput24] = useState({})

    

    const handleAge = (e) => {
        setAge(e.target.value);
    }

    const handleHeight = (e) => {
        setHeight(e.target.value);
    }

    const handleSchedules = (key,index,e) => {
        const newValue =  [...schedules.slice(0,index),{
            ...schedules[index],
            [key.toString()] : e.target.value
        }, ...schedules.slice(index+1)]

        setSchedules(newValue)

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
                <img src={Logo} style={{position : 'absolute' , width : 150, height : 100 , top : 80, left : '44%'}}/>
                <StyledSwiper
                    allowTouchMove={false}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper)=>{
                        (swiperRef).current = swiper
                    }}
                    slidesPerView={1}
                    >
                    <SwiperSlide style={{}}>
                        <SwiperContainer>
                            <div style={{height : 20}}/>
                            <div>
                                성별
                            </div>
                            <CheckBoxContainer>
                            {Object.keys(sex_option).map((keys)=>{
                                return <FormControlLabel control={<Checkbox checked={sex === sex_option[keys]} onChange={()=>{
                                    setSex(sex_option[keys])
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
                            <StyledInput style={{width : 200}} inputMode='numeric' value={age} onChange={handleAge} placeholder='나이를 입력해 주세요'></StyledInput>
                            <div style={{height : 10}}/>
                            <StyledInput style={{width : 200}} inputMode='numeric' value={height} onChange={handleHeight} placeholder='신장을 입력해 주세요(Cm)'></StyledInput>
                            <div style={{height : 50}}/>
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
                            <ScheduleItem index={1} data={input1} handler={setInput1}/>
                            <ScheduleItem index={2} data={input2} handler={setInput2}/>
                            <ScheduleItem index={3} data={input3} handler={setInput3}/>
                            <ScheduleItem index={4} data={input4} handler={setInput4}/>
                            <ScheduleItem index={5} data={input5} handler={setInput5}/>
                            <ScheduleItem index={6} data={input6} handler={setInput6}/>
                            <ScheduleItem index={7} data={input7} handler={setInput7}/>
                            <ScheduleItem index={8} data={input8} handler={setInput8}/>
                            <ScheduleItem index={9} data={input9} handler={setInput9}/>
                            <ScheduleItem index={10} data={input10} handler={setInput10}/>
                            <ScheduleItem index={11} data={input11} handler={setInput11}/>
                            <ScheduleItem index={12} data={input12} handler={setInput12}/>
                            <ScheduleItem index={13} data={input13} handler={setInput13}/>
                            <ScheduleItem index={14} data={input14} handler={setInput14}/>
                            <ScheduleItem index={15} data={input15} handler={setInput15}/>
                            <ScheduleItem index={16} data={input16} handler={setInput16}/>
                            <ScheduleItem index={17} data={input17} handler={setInput17}/>
                            <ScheduleItem index={18} data={input18} handler={setInput18}/>
                            <ScheduleItem index={19} data={input19} handler={setInput19}/>
                            <ScheduleItem index={20} data={input20} handler={setInput20}/>
                            <ScheduleItem index={21} data={input21} handler={setInput21}/>
                            <ScheduleItem index={22} data={input22} handler={setInput22}/>
                            <ScheduleItem index={23} data={input23} handler={setInput23}/>
                            <ScheduleItem index={24} data={input24} handler={setInput24}/>
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
                    <SwiperSlide style={{}}>
                        <SwiperContainer>
                            <Result/>
                            <Result/>
                            <Result/>
                            <Result/>
                            <Result/>
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


const Container = styled('div')(()=>({
    display : 'flex',
    width : '100%',
    height : 400,
    flexDirection : 'column',
    overflowY : 'scroll'
}))

const ButtonContainer = styled('div')(()=>({
    alignItems : 'flex-end',
    justifyContent : 'flex-start',
    display : 'flex',
    flex : 1,
    position : 'absolute',
    bottom : 0,
    left : 0
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
    flexDirection : 'column',
    alignItems : 'flex-start',
    justifyContent : 'flex-start',
    position : 'relative'
}))

const PageContainer = styled('div')(() => ({
    maxWidth : 1000,
    maxHeight : 400,
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
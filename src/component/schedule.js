import React, { useState } from "react";
import { InputBase, Select ,styled , FormControl , InputLabel , MenuItem , IconButton, OutlinedInput } from '@mui/material'
import { AddBox } from '@mui/icons-material';

const program_option = [
    'One',
    'One',
    'One',
    'One',
    'One',
    'One',
    'One',
    'One',
    'One',
    'One',
    'One',
    'One',
    'One',
    'One',
    'One',
]
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 100,
        width: 100,
      },
    },
};

const ScheduleItem = (props) => {

    const [program, setProgram] = useState('')
    const [weight , setWeight] = useState()
    const [fatPerWeight , setFatPerWeight] = useState()
    const [squat , setSquat] = useState()
    const [benchpress , setBenchpress] = useState()
    const [deadlift , setDeadlift] = useState()

    const handleweight = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setWeight(e.target.value);
        }
    }
    const handlefatPerWeight = (e) => {
        const i = props.data[props.index]
        
        props.setData()
    }

    const handleBenchpress = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setBenchpress(e.target.value);
        }
    }
    const handleSquat = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setSquat(e.target.value);
        }
    }
    const handleDead = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setDeadlift(e.target.value);
        }
    }
    console.log(props.data)
    return (<ItemContainer>
        {props.index+1}주차
        <div style={{width : 20}}/>
        <FormControl sx={{width : 150 }}>
            <Select
                style={{height : 30 , fontSize : 10}}
                displayEmpty
                onChange={(event)=>{
                    props.handleSchedules('program',props.index,event)
                }}
                renderValue={(selected) => {
                    if (selected === '') {
                    return <em>프로그램 선택</em>;
                    }
                    return program_option[selected]
                }}       
                MenuProps={MenuProps}
                input={<OutlinedInput/>}
                value={props.data.program}
            >
                <MenuItem disabled value="">프로그램 선택</MenuItem>
                {program_option.map((data,index)=>{
                    return <MenuItem value={index+1}>
                        {data}
                    </MenuItem>
                })}
            </Select>
        </FormControl>
        <div style={{height : 10}}/>
        <StyledInputContainer>
            <StyledInput onChange={(e)=>{
                props.handleSchedules('fat_rate',props.index,e)
            }} value ={props.data.fat_rate} style={{border : '1px solid'}} placeholder={`체지방률을 입력해 주세요`}></StyledInput>
            <StyledInput onChange={(e)=>{
                props.handleSchedules('fat_rate',props.index,e)
            }}  value ={props.data.weight} style={{border : '1px solid'}} placeholder={`몸무게를 입력해 주세요(KG)`}></StyledInput>
            <StyledInput onChange={(e)=>{
                props.handleSchedules('fat_rate',props.index,e)
            }}  value ={props.data.squat} style={{border : '1px solid'}} placeholder={`스쿼트(KG)`}></StyledInput>
            <StyledInput onChange={(e)=>{
                props.handleSchedules('fat_rate',props.index,e)
            }}  value ={props.data.deadlift} style={{border : '1px solid'}} placeholder={`데드(KG)`}></StyledInput>
            <StyledInput onChange={(e)=>{
                props.handleSchedules('fat_rate',props.index,e)
            }}  value ={props.data.benchpress} style={{border : '1px solid'}} placeholder={`벤치(KG)`}></StyledInput>
        </StyledInputContainer>
    </ItemContainer>)
}


const Schedule = (props) => {
    
    return (
        <Container>
            {props.schedules.map((data,index)=>{
                return ( 
                    <Wrapper>
                        <ScheduleItem data={data} handleSchedules={props.handleSchedules} index={index}/>
                    </Wrapper>)
            })}
            {/* {props.schedules.length === 24 ? null :
            <AddContainer>
                <IconButton style={{width : 40, height : 40}} onClick={()=>{
                    props.setSchedules([...props.schedules,[]])
                }}>
                    <AddBox style={{width : 40, height : 40}}/>
                </IconButton>
            </AddContainer>} */}
        </Container>
    )
}

const AddContainer = styled('div')(()=>({
    marginTop: 30,
    width : '100%',
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'center'
}))


const StyledInputContainer = styled('div')(()=>({
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'space-between'
}))

const Wrapper = styled('div')(() => ({
    display : 'flex',
    flexDirection : 'column',
    alignItems : 'flex-start'
}))

const ItemContainer = styled('div')(()=>({
    marginTop : 15,
    display : 'flex',
    flexDirection : 'row',
    width : '100%',
    alignItems : 'center',
    justifyContent : 'flex-start'
}))

const PlusButton = styled('div')(()=>({

}))

const Container = styled('div')(()=>({
    display : 'flex',
    width : '100%',
    height : 400,
    flexDirection : 'column',
    overflowY : 'scroll'
}))

const StyledInput = styled(InputBase)(()=>({
    width : 150,
    height : 30,
    border : '1px solid #FFF',
    textAlign : 'center',
    padding : 4,
    fontSize : 10
}))

export default Schedule
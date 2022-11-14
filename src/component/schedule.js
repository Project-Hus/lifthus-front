import React, { useState } from "react";
import { Input,Select ,styled , FormControl , InputLabel , MenuItem , IconButton, OutlinedInput } from '@mui/material'
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
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
};


const Schedule = () => {

    const [schedules, setSchedules] = useState([{}])
    const [program, setProgram] = useState('')
    const [weight , setWeight] = useState({})
    const [fatPerWeight , setFatPerWeight] = useState()

    return (
        <Container>
            {schedules.map((data,index)=>{
                return ( <ItemContainer>
                    1주차
                    <div style={{height : 10}}/>
                    <FormControl sx={{width : 300}}>
                        <Select
                            displayEmpty
                            onChange={(event)=>{
                                setProgram(event.target.value)
                            }}
                            renderValue={(selected) => {
                                if (selected === '') {
                                return <em>프로그램 선택</em>;
                                }
                                return program_option[selected]
                            }}       
                            MenuProps={MenuProps}
                            input={<OutlinedInput/>}
                            value={program}
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
                    몸무게 변화
                    <StyledInputContainer>
                        <StyledInput placeholder={`${index}주차 체지방률을 입력해 주세요`}></StyledInput>
                        <StyledInput placeholder={`${index}주차 몸무게를 입력해 주세요(KG)`}></StyledInput>
                    </StyledInputContainer>
                    3대 운동 무게
                    <StyledInputContainer>
                        <StyledInput placeholder={`${index}주차 스쿼트 무개`}></StyledInput>
                        <StyledInput placeholder={`${index}주차 데드리프트 무게(KG)`}></StyledInput>
                        <StyledInput placeholder={`${index}주차 벤치 무게 (KG)`}></StyledInput>
                    </StyledInputContainer>
                </ItemContainer>)
            })}
            <IconButton style={{width : 40, height : 40}} onClick={()=>{
                setSchedules([...schedules,[]])
            }}>
                <AddBox style={{width : 40, height : 40}}/>
            </IconButton>
        </Container>
    )
}


const StyledInputContainer = styled('div')(()=>({
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'space-between'
}))

const ItemContainer = styled('div')(()=>({
    display : 'flex',
    flexDirection : 'column',
    width : '99%',
    alignItems : 'flex-start',
}))

const PlusButton = styled('div')(()=>({

}))

const Container = styled('div')(()=>({
    display : 'flex',
    width : '100%',
    height : '100%',
    flexDirection : 'column',
    overflow : 'scroll'
}))

const StyledInput = styled(Input)(()=>({
    width : '25%'
}))

export default Schedule
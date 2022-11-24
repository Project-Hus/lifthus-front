import React, { useState } from "react";
import { InputBase, Select ,styled , FormControl ,  MenuItem , OutlinedInput } from '@mui/material'


const program_option = [
    '휴식', // 0
    'Kizen Powerlifting Peaking Program', // 1
    'nSuns Programs',
    'Jim Wendler 5/3/1 Programs',
    'Calgary Barbell Programs',
    'Sheiko Programs',
    'Candito Program',
    'Juggernaut Method Base Template',
    'Greg Nuckols 28 Programs',
    'Beginner Powerlifting Programs',
    'Intermediate Powerlifting Programs',
    'Madcow 5x5 Program',
    'General 5x5 Program',
    '기타(etc)' // 기타는 index 242로 설정 [ 주의 ]
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

    const onHandleValue = (key,e) => {
        const newValue = {
            ...props.data,
            [key.toString()] : parseInt(e.target.value)
        }
        props.handler(newValue)
    }

    return (
        <Wrapper>
            <ItemContainer>
                {props.index} 주차
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
                            return program_option[selected === 242 ? 13: selected]
                        }}
                        MenuProps={MenuProps}
                        input={<OutlinedInput/>}
                        value={props.data.program}
                    >
                        <MenuItem disabled value="">프로그램 선택</MenuItem>
                        {program_option.map((data,index)=>{
                            return <MenuItem value={()=>{
                                if(data === '기타(etc)'){
                                    return 242
                                }else{
                                    return index
                                }
                            }}>
                                {data}
                            </MenuItem>
                        })}
                    </Select>
                </FormControl>
                <div style={{height : 10}}/>
                <StyledInputContainer>
                    <StyledInput onChange={(e)=>{
                        onHandleValue('fat_rate',e)
                    }} value ={props.data.fat_rate} style={{border : '1px solid'}} placeholder={`체지방률을 입력해 주세요`}></StyledInput>
                    <StyledInput onChange={(e)=>{
                        onHandleValue('weight',e)
                    }}  value ={props.data.weight} style={{border : '1px solid'}} placeholder={`몸무게를 입력해 주세요(KG)`}></StyledInput>
                    <StyledInput onChange={(e)=>{
                        onHandleValue('squat',e)
                    }}  value ={props.data.squat} style={{border : '1px solid'}} placeholder={`스쿼트(KG)`}></StyledInput>
                    <StyledInput onChange={(e)=>{
                        onHandleValue('deadlift',e)
                    }}  value ={props.data.deadlift} style={{border : '1px solid'}} placeholder={`데드(KG)`}></StyledInput>
                    <StyledInput onChange={(e)=>{
                        onHandleValue('benchpress',e)
                    }}  value ={props.data.benchpress} style={{border : '1px solid'}} placeholder={`벤치(KG)`}></StyledInput>
                </StyledInputContainer>
            </ItemContainer>
        </Wrapper>
)
}





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

const StyledInputContainer = styled('div')(()=>({
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'space-between'
}))



export default ScheduleItem
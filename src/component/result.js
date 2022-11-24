import React , { useState } from 'react'
import { styled , Grid } from '@mui/material'


const ex = { method: 'Wendler 531', sqaut: 162.3, benchpress: 120.1, deadlift: 181.5 }

const Result = () => {
    return(
        <Grid container styled={{height : 400}}>
            <StyledContainer>
                <StyledText>
                    Recommanded Method :  {ex.method}
                </StyledText>
                <div style={{height : 10}}/>
                <StyledText>
                    예측 스쿼트 중량 :  {ex.sqaut}
                </StyledText>                    
                <StyledText>
                    예측 벤치 중량 :  {ex.benchpress}
                </StyledText>              
                <StyledText>
                    예측 데드 중량 :  {ex.deadlift}
                </StyledText>    
                <StyledText>
                    예측 총합 :  {ex.deadlift+ex.sqaut+ex.benchpress}
                </StyledText>                    
                
            </StyledContainer>
        </Grid>
    )
}

const StyledText = styled('div')(({}) => ({
    fontWeight : 'bold'
}))

const StyledContainer = styled('div')(({})=>({
    border : '1px solid #000',
    width : '100%',
    height : '100%',
    padding : 12,
    marginTop : 10,
    borderRadius : 10,
    ':hover' : {
        backgroundColor : 'gray'
    }
}))

export default Result
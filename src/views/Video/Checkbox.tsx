import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ToggleButton } from '@mui/material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import OutletIcon from '@mui/icons-material/Outlet';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SentimentVeryDissatisfiedRoundedIcon from '@mui/icons-material/SentimentVeryDissatisfiedRounded';
import SickIcon from '@mui/icons-material/Sick';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { CARD_LIST_FILTER_EXPRESSION, CARD_LIST_FILTER_DATE } from '../../redux/types';
import { styled } from '@mui/material/styles';

const ToggleButtons1 = styled(ToggleButton)(() => ({
    '&.Mui-selected, &.Mui-selected:hover': {
        color: '#9a3412',
        backgroundColor: '#fdba74',
        fontWeight: 'bold',
    },
}));
const ToggleButtons2 = styled(ToggleButton)(() => ({
    '&.Mui-selected, &.Mui-selected:hover': {
        color: '#155e75',
        backgroundColor: '#67e8f9',
        fontWeight: 'bold',
    },
}));
const ToggleButtons3 = styled(ToggleButton)(() => ({
    '&.Mui-selected, &.Mui-selected:hover': {
        color: '#991b1b',
        backgroundColor: '#fca5a5',
        fontWeight: 'bold',
    },
}));
const ToggleButtons4 = styled(ToggleButton)(() => ({
    '&.Mui-selected, &.Mui-selected:hover': {
        color: '#166534',
        backgroundColor: '#86EFAC',
        fontWeight: 'bold',
    },
}));
const ToggleButtons5 = styled(ToggleButton)(() => ({
    '&.Mui-selected, &.Mui-selected:hover': {
        color: '#6b21a8',
        backgroundColor: '#d8b4fe',
        fontWeight: 'bold',
    },
}));
const ToggleButtons6 = styled(ToggleButton)(() => ({
    '&.Mui-selected, &.Mui-selected:hover': {
        color: '#854d0e',
        backgroundColor: '#fde047',
        fontWeight: 'bold',
    },
}));

export default function IndeterminateCheckbox(props: any) {
    const dispatch = useDispatch();
    const { cardList } = useSelector((state: any) => state.cardList);
    const [checked, setChecked] = React.useState([true, true, true, true, true, true]);
    const [option, setOption] = React.useState(0);
    const handleChange = (event: any) => {
        props.setOption(event.target.value);
        setOption(event.target.value);
        //localStorage.setItem('option', event.target.value);
        //window.location.reload();
    };
    const handleChange1 = (event: any) => {
        props.setChecked([
            event.target.checked,
            event.target.checked,
            event.target.checked,
            event.target.checked,
            event.target.checked,
            event.target.checked,
        ]);
        setChecked([
            event.target.checked,
            event.target.checked,
            event.target.checked,
            event.target.checked,
            event.target.checked,
            event.target.checked,
        ]);
        if (checked[0] && checked[1] && checked[2] && checked[3] && checked[4] && checked[5]) {
            dispatch({
                type: CARD_LIST_FILTER_EXPRESSION,
                payload: { checked: [false, false, false, false, false, false] },
            });
            props.setOption(0);
            setOption(0);
        } else {
            dispatch({
                type: CARD_LIST_FILTER_EXPRESSION,
                payload: [true, true, true, true, true, true],
            });
        }
    };

    const handleChange2 = () => {
        props.setChecked([!checked[0], checked[1], checked[2], checked[3], checked[4], checked[5]]);
        setChecked([!checked[0], checked[1], checked[2], checked[3], checked[4], checked[5]]);
    };

    const handleChange3 = () => {
        props.setChecked([checked[0], !checked[1], checked[2], checked[3], checked[4], checked[5]]);
        setChecked([checked[0], !checked[1], checked[2], checked[3], checked[4], checked[5]]);
    };
    const handleChange4 = () => {
        props.setChecked([checked[0], checked[1], !checked[2], checked[3], checked[4], checked[5]]);
        setChecked([checked[0], checked[1], !checked[2], checked[3], checked[4], checked[5]]);
    };
    const handleChange5 = () => {
        props.setChecked([checked[0], checked[1], checked[2], !checked[3], checked[4], checked[5]]);
        setChecked([checked[0], checked[1], checked[2], !checked[3], checked[4], checked[5]]);
    };
    const handleChange6 = () => {
        props.setChecked([checked[0], checked[1], checked[2], checked[3], !checked[4], checked[5]]);
        setChecked([checked[0], checked[1], checked[2], checked[3], !checked[4], checked[5]]);
    };
    const handleChange7 = () => {
        props.setChecked([checked[0], checked[1], checked[2], checked[3], checked[4], !checked[5]]);
        setChecked([checked[0], checked[1], checked[2], checked[3], checked[4], !checked[5]]);
    };

    // setChecked([checked[0], checked[1], checked[2], checked[3], event.target.checked]);
    // useEffect(() => {
    //     dispatch({
    //         type: CARD_LIST_FILTER_EXPRESSION,
    //         payload: { checked: checked },
    //     });
    // }, [checked]);
    // useEffect(() => {
    //     dispatch({
    //         type: CARD_LIST_FILTER_DATE,
    //         payload: { option: option },
    //     });
    // }, [option]);
    // useEffect(() => {
    //     props.setOption(0);
    //     setOption(0);
    // }, []);
    const children = (
        // <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        //     <FormControlLabel label="Child 1" control={<Checkbox checked={checked[0]} onChange={handleChange2} />} />
        //     <FormControlLabel label="Child 2" control={<Checkbox checked={checked[1]} onChange={handleChange3} />} />
        //     <FormControlLabel label="Child 3" control={<Checkbox checked={checked[2]} onChange={handleChange4} />} />
        //     <FormControlLabel label="Child 4" control={<Checkbox checked={checked[3]} onChange={handleChange5} />} />
        // </Box>
        <Stack
            sx={{ mt: 4, pl: 10, p: 4, color: 'white', display: 'flex', justifyContent: 'center', alignContent: 'center' }}
            direction="row"
            spacing={2}
        >
            <FormControl sx={{ ml: -10, minWidth: 130 }}>
                <Select
                    value={option}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{ border: 1, borderColor: 'white', color: 'white' }}
                >
                    <MenuItem value={0}>최신순</MenuItem>
                    <MenuItem value={1}>오래된순</MenuItem>
                </Select>
            </FormControl>
            <FormControlLabel
                label="전체 선택"
                control={
                    <Checkbox
                        checked={checked[0] && checked[1] && checked[2] && checked[3] && checked[4] && checked[5]}
                        style={{
                            color: 'white',
                        }}
                        onChange={handleChange1}
                    />
                }
                sx={{ mt: 3, ml: 3, paddingRight: '20px', border: '1px solid lightgrey', borderRadius: '2px' }}
            />
            <ToggleButtons1 value="check" sx={{ color: 'white' }} selected={checked[0]} onChange={handleChange2}>
                <InsertEmoticonIcon /> 행복해요
            </ToggleButtons1>
            <ToggleButtons2 value="check" sx={{ color: 'white' }} selected={checked[1]} onChange={handleChange3}>
                <SentimentDissatisfiedIcon />
                슬퍼요
            </ToggleButtons2>
            <ToggleButtons3 value="check" sx={{ color: 'white' }} selected={checked[2]} onChange={handleChange4}>
                <LocalFireDepartmentIcon />
                화나요
            </ToggleButtons3>
            <ToggleButtons4 value="check" sx={{ color: 'white' }} selected={checked[3]} onChange={handleChange5}>
                <SickIcon />
                힘들어요
            </ToggleButtons4>
            <ToggleButtons5 value="check" sx={{ color: 'white' }} selected={checked[4]} onChange={handleChange6}>
                <SentimentVeryDissatisfiedRoundedIcon />
                두려워요
            </ToggleButtons5>
            <ToggleButtons6 value="check" sx={{ color: 'white' }} selected={checked[5]} onChange={handleChange7}>
                <OutletIcon />
                놀라워요
            </ToggleButtons6>
        </Stack>
    );

    return (
        <Box>
            {/* <FormControlLabel
                label="전체선택"
                control={
                    <Checkbox checked={checked[0] && checked[1] && checked[2] && checked[3] && checked[4] && checked[5]} onChange={handleChange1} />
                }
                sx={{ mt: 3, ml: 3 }}
            /> */}
            {children}
        </Box>
    );
}

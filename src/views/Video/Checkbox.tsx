import * as React from 'react';
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
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function IndeterminateCheckbox() {
    const [option, setOption] = React.useState('Newest');
    const [checked, setChecked] = React.useState([false, false, false, false, false, false]);

    const handleChange = (event: any) => {
        setOption(event.target.value);
    };
    const handleChange1 = (event: any) => {
        setChecked([
            event.target.checked,
            event.target.checked,
            event.target.checked,
            event.target.checked,
            event.target.checked,
            event.target.checked,
        ]);
    };

    /*
    
    useState : 기존값 불러온다
    setChecked()
const handleClickc = () => {
    setState(false)
} 
    setState(false)

    */

    const handleChange2 = () => {
        setChecked([!checked[0], checked[1], checked[2], checked[3], checked[4], checked[5]]);
    };

    const handleChange3 = () => {
        setChecked([checked[0], !checked[1], checked[2], checked[3], checked[4], checked[5]]);
    };
    const handleChange4 = () => {
        setChecked([checked[0], checked[1], !checked[2], checked[3], checked[4], checked[5]]);
    };
    const handleChange5 = () => {
        setChecked([checked[0], checked[1], checked[2], !checked[3], checked[4], checked[5]]);
    };
    const handleChange6 = () => {
        setChecked([checked[0], checked[1], checked[2], checked[3], !checked[4], checked[5]]);
    };
    const handleChange7 = () => {
        setChecked([checked[0], checked[1], checked[2], checked[3], checked[4], !checked[5]]);
    };
    // setChecked([checked[0], checked[1], checked[2], checked[3], event.target.checked]);

    const children = (
        // <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        //     <FormControlLabel label="Child 1" control={<Checkbox checked={checked[0]} onChange={handleChange2} />} />
        //     <FormControlLabel label="Child 2" control={<Checkbox checked={checked[1]} onChange={handleChange3} />} />
        //     <FormControlLabel label="Child 3" control={<Checkbox checked={checked[2]} onChange={handleChange4} />} />
        //     <FormControlLabel label="Child 4" control={<Checkbox checked={checked[3]} onChange={handleChange5} />} />
        // </Box>
        <Stack sx={{ pt: 4, pl: 10 }} direction="row" spacing={2} justifyContent="center">
            <FormControl sx={{ ml: -10, minWidth: 130 }}>
                <Select
                    value={option}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{ border: 1, borderColor: '#60a5fa' }}
                >
                    <MenuItem value={'Newest'}>Newest</MenuItem>
                    <MenuItem value={'Oldest'}>Oldest</MenuItem>
                    <MenuItem value={'Longest'}>Longest</MenuItem>
                    <MenuItem value={'Shortest'}>Shortest</MenuItem>
                </Select>
            </FormControl>
            <ToggleButton value="check" selected={checked[0]} onChange={handleChange2}>
                <InsertEmoticonIcon /> Happy
            </ToggleButton>
            <ToggleButton value="check" selected={checked[1]} onChange={handleChange3}>
                <SentimentDissatisfiedIcon />
                Sad
            </ToggleButton>
            <ToggleButton value="check" selected={checked[2]} onChange={handleChange4}>
                <LocalFireDepartmentIcon /> Angry
            </ToggleButton>
            <ToggleButton value="check" selected={checked[3]} onChange={handleChange5}>
                <SickIcon />
                Disgusted
            </ToggleButton>
            <ToggleButton value="check" selected={checked[4]} onChange={handleChange6}>
                <SentimentVeryDissatisfiedRoundedIcon />
                Fearful
            </ToggleButton>
            <ToggleButton value="check" selected={checked[5]} onChange={handleChange7}>
                <OutletIcon />
                Surprised
            </ToggleButton>
        </Stack>
    );

    return (
        <Box>
            <FormControlLabel
                label="전체선택"
                control={
                    <Checkbox checked={checked[0] && checked[1] && checked[2] && checked[3] && checked[4] && checked[5]} onChange={handleChange1} />
                }
                sx={{ mt: 3, ml: 3 }}
            />
            {children}
        </Box>
    );
}

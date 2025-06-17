import React, {useContext} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import burger_svg from "../images/burger.svg";
import {ContractContext} from "../context/ContractProvider";

export function AppMenu() {
    const {setInkVersion} = useContext(ContractContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    const switchV5 = (event) => {
        setInkVersion('v5');
    };
    const switchV6 = (event) => {
        setInkVersion('v6');
    };

  return (
    <div>
      <Button
          id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{float:"right"}}
      >
        <img style={{width: "30px", filter: "invert(1)"}} src={burger_svg}/>
      </Button>
      <Menu
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
          <a onClick={switchV5}><MenuItem>ink! v5</MenuItem></a>
          <a onClick={switchV6}><MenuItem>ink! v6</MenuItem></a>
      </Menu>
    </div>
  );
}
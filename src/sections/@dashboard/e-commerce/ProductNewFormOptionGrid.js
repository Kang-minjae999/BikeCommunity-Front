import PropTypes from 'prop-types';
// @mui
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  TableContainer,
} from '@mui/material';
// utils
import Iconify from '../../../components/Iconify';



// ----------------------------------------------------------------------
ProductNewFormOptionGrid.propTypes = {
    options: PropTypes.array,
    optionmany: PropTypes.string,
    setOptions: PropTypes.func,
  };
  

export default function ProductNewFormOptionGrid({optionmany, options, setOptions}) {
    const onDelete = (id) => {
        setOptions(options.filter((item) => item.id !== id))

    }
  return (
    <TableContainer sx={{ Width:'100%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">옵션1</TableCell>
            {optionmany === '2개' &&<TableCell align="left">옵션2</TableCell>}
            {optionmany === '3개' && <>
            <TableCell align="left">옵션2</TableCell>
            <TableCell align="left">옵션3</TableCell>
            </>}
            <TableCell align="left">재고수량</TableCell>
            <TableCell align="left">정상가</TableCell>
            <TableCell align="left">판매가</TableCell>
            <TableCell align="left">모델명</TableCell>
            <TableCell align="left">sku</TableCell>
            <TableCell align="right">삭제</TableCell>
          </TableRow>
        </TableHead>

        {options && <TableBody>
          {options.map((product) => {
            const { id, option1, option2, option3, howmany, modelname, price, priceSale, sku} = product;
            return (
                <TableRow key={sku}>
                <TableCell>
                      <Typography noWrap variant="body2" sx={{ maxWidth: 240 }}>
                        {option1}
                      </Typography>
                </TableCell>
                {option2 && 
                <TableCell>
                      <Typography noWrap variant="body2" sx={{ maxWidth: 240 }}>
                        {option2}
                      </Typography>
                </TableCell>
                }
                {option3 && <>
                <TableCell>
                      <Typography noWrap variant="body2" sx={{ maxWidth: 240 }}>
                        {option3}
                      </Typography>
                </TableCell>
                </>}
                <TableCell>
                        <Typography variant="body2">
                          {howmany}개
                        </Typography>
                </TableCell>
                <TableCell>
                        <Typography variant="body2">
                          {price}원
                        </Typography>
                </TableCell>
                <TableCell>
                        <Typography variant="body2">
                          {priceSale}원
                        </Typography>
                </TableCell>
                <TableCell>
                        <Typography variant="body2">
                          {modelname}
                        </Typography>
                </TableCell>
                <TableCell align="left">{sku}</TableCell>

                <TableCell align="right">
                  <IconButton onClick={() => onDelete(id)}>
                    <Iconify icon={'eva:trash-2-outline'} width={20} height={20} />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>}
      </Table>
    </TableContainer>
  );
}



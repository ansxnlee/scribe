import React, { useEffect, useState } from 'react';
import PatientsService from './PatientsService';

// imports for patientlist
import Button from '@mui/material/Button';
import { 
    DataGrid, 
    GridToolbarDensitySelector,
    GridToolbarFilterButton 
} from '@mui/x-data-grid';

// imports for searchbar
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

const patientsService = new PatientsService();

export default function PatientsList() {
    const [patients, setPatients] = useState([]);
    const [nextPageURL, setNextPageURL] = useState('');
    // hooks for search bar
    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState(patients);

    // hook version of componentDidMount
    useEffect(() => {
        patientsService.getPatients().then(patients => {
            setPatients(patients.data);
            setNextPageURL(patients.nextlink);
        });
    }, []);

    // effect hook for toolbar search filter
    useEffect(() => {
        setRows(patients);
      }, [patients]);

    const handleDelete = (pk) => {
        patientsService.deletePatient({pk: pk}).then(() => {
            var newArr = patients.filter(function(obj) {
                return obj.pk !== pk;
            });
            setPatients(newArr);
        })
    };

    // old pagination replaced by mui-datagrid
    const nextPage = () => {
        patientsService.getPatientsByURL(nextPageURL).then((result) => {
            setPatients(result.data);
            setNextPageURL(result.nextlink);
        });
    };

    const dataGridColumns = [
        { field: 'pk', headerName: 'ID', headerClassName:"", width: 70, hide: true },
        { field: 'first_name', headerName: 'First Name', width: 130 },
        { field: 'last_name', headerName: 'Last Name', width: 130 },
        { field: 'phone', headerName: 'Phone', width: 130 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'address', headerName: "Address", width: 200 },
        { field: 'description', headerName: 'Description', width: 200 },
        {
            field: "delete",
            headerName: "Delete",
            sortable: false,
            width: 100,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = () => {
                    handleDelete(params.row.pk);
                }
                return <Button onClick={onClick}>Delete</Button>
            }
        },
        {
            field: "update",
            headerName: "Update",
            sortable: false,
            width: 100,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return <a href={"/patient/" + params.row.pk}>Update</a>
            }
        },
    ];

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = patients.filter((row) => {
          return Object.keys(row).some((field) => {
            return searchRegex.test(row[field].toString());
          });
        });
        setRows(filteredRows);
      };

    return (
        <>
        <div className="patients--list">
            <div style={{ height: 450, width: '100%' }}>
                <DataGrid
                    components={{ Toolbar: QuickSearchToolbar }}
                    rows={rows}
                    getRowId={(patients) => patients.pk}
                    columns={dataGridColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    componentsProps={{
                        toolbar: {
                          value: searchText,
                          onChange: (event) => requestSearch(event.target.value),
                          clearSearch: () => requestSearch(''),
                        },
                    }}
                />
            </div>
        </div>
        </>
    );
};

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar(props) {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
          justifyContent: 'space-between',
          display: 'flex',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
        </div>
        <TextField
          variant="standard"
          value={props.value}
          onChange={props.onChange}
          placeholder="Search…"
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{ visibility: props.value ? 'visible' : 'hidden' }}
                onClick={props.clearSearch}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          }}
          sx={{
            width: {
              xs: 1,
              sm: 'auto',
            },
            m: (theme) => theme.spacing(1, 0.5, 1.5),
            '& .MuiSvgIcon-root': {
              mr: 0.5,
            },
            '& .MuiInput-underline:before': {
              borderBottom: 1,
              borderColor: 'divider',
            },
          }}
        />
      </Box>
    );
}
import React, {useState, useEffect} from 'react';
import PageContainer from '../../reusable/breadcrumbs';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import DataTable from '../../reusable/table';
import {columns} from './table-column';
import {Button, CircularProgress, Grid} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ConstruckModal from '../../reusable/modal';
import CreateNewDriverForm from './form/create.driver';
import {useDispatch, useSelector} from 'react-redux';
import {GET_DRIVERS_LIST_REQUEST} from '../../reducers/drivers/constant';

const Drivers = () => {
    const [showNewModal, setShowNewModal] = useState(false);
    const {
        createDriver: {success: createSuccess},

        listDrivers: {data: listDrivers, loading: listDriversLoading},

        deleteDriver: {success: deleteSuccess}
    } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: GET_DRIVERS_LIST_REQUEST
        });
    }, [dispatch]);

    const handleShowAddNewModel = () => {
        setShowNewModal(true);
    };

    const handleClose = () => {
        setShowNewModal(false);
    };

    useEffect(() => {
        if (createSuccess || deleteSuccess) {
            handleClose();
        }
    }, [createSuccess, deleteSuccess]);
    return (
        <PageContainer pageHeading="List of Drivers">
            <ConstruckModal title="Add driver" show={showNewModal} handleClose={handleClose}>
                <CreateNewDriverForm />
            </ConstruckModal>
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                sx={{
                    margin: '20px 0'
                }}
            >
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleShowAddNewModel}
                    sx={{
                        borderRadius: '8px',
                        background: '#1090CB'
                    }}
                >
                    Add driver
                </Button>
            </Grid>
            <Paper
                sx={{
                    // Adjust the width as needed
                    padding: '10px'
                }}
            >
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="driver-content" id="driver-header">
                        <Typography variant="h6">Driver</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {listDriversLoading ? (
                                <CircularProgress />
                            ) : (
                                <DataTable
                                    showQuickSearchToolbar={false}
                                    checkboxSelection={false}
                                    rows={listDrivers}
                                    columns={columns()}
                                />
                            )}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Paper>
        </PageContainer>
    );
};

export default Drivers;

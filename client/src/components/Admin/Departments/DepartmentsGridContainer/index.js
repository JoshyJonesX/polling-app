import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TableCell from '@material-ui/core/TableCell'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import Add from "@material-ui/icons/Add"

import {
  SortingState, PagingState, GroupingState, RowDetailState, EditingState, SearchState,
  IntegratedFiltering, IntegratedGrouping, IntegratedPaging, IntegratedSorting, 
} from '@devexpress/dx-react-grid'
import {
  Grid, Table, TableHeaderRow, TableEditRow, TableEditColumn, TableFixedColumns,
  SearchPanel, TableGroupRow, TableRowDetail,
  GroupingPanel, PagingPanel, DragDropProvider, TableColumnReordering, TableColumnResizing, Toolbar,
} from '@devexpress/dx-react-grid-material-ui'


var availableValues

const useStyles = makeStyles(theme => ({
  lookupEditCell: {
    padding: theme.spacing(1),
  },
  dialog: {
    width: 'calc(100% - 16px)',
  },
  inputRoot: {
    width: '100%',
  },
  selectMenu: {
    position: 'absolute !important',
  },
}))

const AddButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Add row">
    <Add  />
  </IconButton>
)

const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Edit row">
    <EditIcon />
  </IconButton>
)

const DeleteButton = ({ onExecute }) => (
  <IconButton
    onClick={() => {
      // eslint-disable-next-line
      if (window.confirm('Are you sure you want to delete this row?')) {
        onExecute()
      }
    }}
    title="Delete row"
  >
    <DeleteIcon />
  </IconButton>
)

const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Save changes">
    <SaveIcon />
  </IconButton>
)

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
    <CancelIcon />
  </IconButton>
)

const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
}

const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id]
  return (
    <CommandButton
      onExecute={onExecute}
    />
  )
}

const LookupEditCell = ({
  availableColumnValues, value, onValueChange,
}) => {
  const classes = useStyles()
  return <TableCell
            className={classes.lookupEditCell}
          >
            <Select
                value={value || ''}
                onChange={event => onValueChange(event.target.value)}
                MenuProps={{
                  className: classes.selectMenu,
                }}
                input={(
                    <Input
                      classes={{ root: classes.inputRoot }}
                    />
                )}
            >
            {availableColumnValues.map(item => (
                <MenuItem key={item._id} value={item.abv}>
                  {item.abv}
                </MenuItem>
                ))}
            </Select>
          </TableCell>
}

const EditCell = (props) => {
  const { column } = props
  const availableColumnValues = availableValues[column.name]
  if (availableColumnValues) {
    return <LookupEditCell {...props} availableColumnValues={availableColumnValues} />
  }
  return <TableEditRow.Cell {...props} />
}

const columns = [
  { name: 'name', title: 'Department' },
  { name: 'abv', title: 'ABV' },
  { name: 'faculty', title: 'Faculties' },
  { name: 'nos', title: ' Students' },
  { name: 'noe', title: 'Elections' }
]

const getRowId = department => department._id

export default ({
  faculties,
  departments,
  grid: {
    editingRowIds,
    rowChanges,
    addedRows,
    sorting,
    expandedRowIds,
    grouping,
    expandedGroups,
    searchValue,
    currentPage,
    pageSize,
    pageSizes,
    columnOrder,
    columnWidths,
  },
  getFaculties,
  createDepartment,
  getDepartments,
  editDepartment,
  deleteDepartment,
  onSortingChange,
  onExpandedRowIdsChange,
  onGroupingChange,
  onExpandedGroupsChange,
  onValueChange,
  onCurrentPageChange,
  onPageSizeChange,
  onColumnOrderChange,
  onColumnWidthsChange,
  onEditingRowIdsChange,
  onRowchangesChange,
  onAddedRowsChange,
}) => {

  useEffect(() => {
    getFaculties()
  }, [])

  useEffect(() => {
    getDepartments()
  }, [])

  const [rightFixedColumns] = useState([TableEditColumn.COLUMN_TYPE])
  
  const changeAddedRows = value => onAddedRowsChange(
    value.map(department => (Object.keys(department).length ? department : {
        name: '',
        abv: '',
        nos: '0',
        noe: '0'
      })
    )
  )

  availableValues = {
    faculty: faculties.map(faculty => ({_id: faculty._id, abv: faculty.abv})
    )
  }
  
  // Changes that are committed by the edit functionality
  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      let isFaculty = faculties.find(({ abv }) => abv === added[0].faculty)._id
      let data = {...added[0], id: isFaculty}
      createDepartment(data)
    }
    if (changed) {
      const id = Object.getOwnPropertyNames(changed)[0]
      // Ensure that there are updates, else return
      if (!changed[id]) return
      const data = { _id: id, ...changed[id] }
      editDepartment(data)
    }
    if (deleted) {
      deleteDepartment({_id: deleted[0]})
    }
  }

  departments = departments.map(department => ({
    ...department,
    faculty: department.faculty.abv,
    nos: department.students.length | 0,
    noe: department.elections.length | 0
  }))
  
  return <Paper>
    <Grid
      rows={departments}
      columns={columns}
      getRowId={getRowId}
    >
       <SearchState
          value={searchValue}
          onValueChange={onValueChange}
        />
      <SortingState
        sorting={sorting}
        onSortingChange={onSortingChange}
      />
      <GroupingState
        grouping={grouping}
        onGroupingChange={onGroupingChange}
        expandedGroups={expandedGroups}
        onExpandedGroupsChange={onExpandedGroupsChange}
      />
      <PagingState
        currentPage={currentPage}
        onCurrentPageChange={onCurrentPageChange}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
      />
      
      <EditingState
          editingRowIds={editingRowIds}
          onEditingRowIdsChange={onEditingRowIdsChange}
          rowChanges={rowChanges}
          onRowChangesChange={onRowchangesChange}
          addedRows={addedRows}
          onAddedRowsChange={changeAddedRows}
          onCommitChanges={commitChanges}
        />

      <RowDetailState
        expandedRowIds={expandedRowIds}
        onExpandedRowIdsChange={onExpandedRowIdsChange}
      />

      <IntegratedFiltering />
      <IntegratedSorting />
      <IntegratedGrouping />
      <IntegratedPaging />

      <DragDropProvider />

      <Table />

      <TableColumnResizing
        columnWidths={columnWidths}
        onColumnWidthsChange={onColumnWidthsChange}
      />
      <TableHeaderRow showSortingControls />
      <TableEditRow 
        cellComponent={EditCell}
      />
      <TableEditColumn
        width={170}
        showAddCommand={!addedRows.length}
        showEditCommand
        showDeleteCommand
        commandComponent={Command}
      />
      <TableColumnReordering
        order={columnOrder}
        onOrderChange={onColumnOrderChange}
      />
      <TableGroupRow />
      <TableFixedColumns
          rightColumns={rightFixedColumns}
      />

      {/* <TableRowDetail
        contentComponent={ReduxGridDetailContainer}
      /> */}
      <Toolbar />
      <SearchPanel />
      <GroupingPanel showSortingControls />
      <PagingPanel
        pageSizes={pageSizes}
      />
    </Grid>
  </Paper>
}
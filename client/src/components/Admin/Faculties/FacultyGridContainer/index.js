import React, { useState, useEffect, Fragment } from 'react'
import Paper from '@material-ui/core/Paper'
import {
  IconButton,
  Divider
} from '@material-ui/core'

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

import { DepartmentGridContainer, ElectionGridContainer } from '../../../../containers/'

const GridDetail = ({ row: {elections, departments, _id} }) => {
  const election = elections.map( election => ({
    ...election,
    noc: election.contestants.length || 0,
    active: election.active ? "Yes": "No"
  }))
  const department = departments.map(department => ({
    ...department,
    nos: department.students.length || 0,
    noe: department.elections.length || 0
  }))
  return <Fragment>
    <DepartmentGridContainer row={department} faculty_id={_id} />
    <Divider />
    <ElectionGridContainer row={election} category={"faculty"} faculty_id={_id} />
  </Fragment>
}

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


const columns = [
  { name: 'name', title: 'Faculty' },
  { name: 'abv', title: 'ABV' },
  { name: 'nod', title: ' Departments' },
  { name: 'noe', title: 'Elections' }
]

const getRowId = faculty => faculty._id

export default ({
  faculties,
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
  createFaculty,
  getFaculties,
  editFaculty,
  deleteFaculty,
  onExpandedGroupsChangeFaculty,
  onValueChangeFaculty,
  onCurrentPageChangeFaculty,
  onPageSizeChangeFaculty,
  onEditingRowIdsChangeFaculty,
  onRowchangesChangeFaculty,
  onExpandedRowIdsChangeFaculty,
  onColumnWidthsChangeFaculty,
  onColumnOrderChangeFaculty,
  onGroupingChangeFaculty,
  onSortingChangeFaculty,
  onAddedRowsChangeFaculty,
}) => {

  useEffect(() => {
    getFaculties()
  }, [])

  const [rightFixedColumns] = useState([TableEditColumn.COLUMN_TYPE])
  
  const changeAddedRows = value => onAddedRowsChangeFaculty(
    value.map(faculty => (Object.keys(faculty).length ? faculty : {
        name: '',
        abv: '',
        nod: '0',
        noe: '0'
      })
    )
  )


  // Changes that are committed by the edit functionality
  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
     createFaculty(added[0])
    }
    if (changed) {
      const id = Object.getOwnPropertyNames(changed)[0]
      // Ensure that there are updates, else return
      if (!changed[id]) return
      const data = { _id: id, ...changed[id]}
      editFaculty(data)
    }
    if (deleted) {
      deleteFaculty({_id: deleted[0]})
    }
  }

  faculties = faculties.map(faculty => ({
    ...faculty,    
    nod: faculty.departments.length || 0,
    noe: faculty.elections.length || 0
  }))
  
  return <Paper>
    <Grid
      rows={faculties}
      columns={columns}
      getRowId={getRowId}
    >
       <SearchState
          value={searchValue}
          onValueChange={onValueChangeFaculty}
        />
      <SortingState
        sorting={sorting}
        onSortingChange={onSortingChangeFaculty}
      />
      <GroupingState
        grouping={grouping}
        onGroupingChange={onGroupingChangeFaculty}
        expandedGroups={expandedGroups}
        onExpandedGroupsChange={onExpandedGroupsChangeFaculty}
      />
      <PagingState
        currentPage={currentPage}
        onCurrentPageChange={onCurrentPageChangeFaculty}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChangeFaculty}
      />
      
      <EditingState
          editingRowIds={editingRowIds}
          onEditingRowIdsChange={onEditingRowIdsChangeFaculty}
          rowChanges={rowChanges}
          onRowChangesChange={onRowchangesChangeFaculty}
          addedRows={addedRows}
          onAddedRowsChange={changeAddedRows}
          onCommitChanges={commitChanges}
        />

      <RowDetailState
        expandedRowIds={expandedRowIds}
        onExpandedRowIdsChange={onExpandedRowIdsChangeFaculty}
      />

      <IntegratedFiltering />
      <IntegratedSorting />
      <IntegratedGrouping />
      <IntegratedPaging />

      <DragDropProvider />

      <Table />

      <TableColumnResizing
        columnWidths={columnWidths}
        onColumnWidthsChange={onColumnWidthsChangeFaculty}
      />
      <TableHeaderRow showSortingControls />
      <TableEditRow/>
      <TableEditColumn
        width={170}
        showAddCommand={!addedRows.length}
        showEditCommand
        showDeleteCommand
        commandComponent={Command}
      />
      <TableColumnReordering
        order={columnOrder}
        onOrderChange={onColumnOrderChangeFaculty}
      />
      <TableGroupRow />
      <TableFixedColumns
          rightColumns={rightFixedColumns}
      />

      <TableRowDetail
        contentComponent={GridDetail}
      />
      <Toolbar />
      <SearchPanel />
      <GroupingPanel showSortingControls />
      <PagingPanel
        pageSizes={pageSizes}
      />
    </Grid>
  </Paper>
}
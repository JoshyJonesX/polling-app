import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'

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

import { ContestantGridContainer } from '../../../../containers/'

const GridDetail = ({ row: {contestants, _id} }) =>  <ContestantGridContainer row={contestants} election_id={_id} />

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



const getRowId = election => election._id

export default ({
  row,
  faculty_id,
  department_id,
  elections,
  category,
  grid: {
    rows,
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
  getDepartments,
  createElection,
  createElections,
  getElections,
  editElection,
  deleteElection,
  onExpandedGroupsChangeElection,
  onValueChangeElection,
  onCurrentPageChangeElection,
  onPageSizeChangeElection,
  onEditingRowIdsChangeElection,
  onRowchangesChangeElection,
  onGroupingChangeElection,
  onExpandedRowIdsChangeElection,
  onColumnOrderChangeElection,
  onColumnWidthsChangeElection,
  onSortingChangeElection,
  onAddedRowsChangeElection,
}) => {
  if (!row) {
    useEffect(() => {
      getFaculties()
    }, [])
  
    useEffect(() => {
      getDepartments()
    }, [])
  
    useEffect(() => {
      getElections()
    }, [])
  }
  

  const [rightFixedColumns] = useState([TableEditColumn.COLUMN_TYPE])
  const columns = [
    { name: 'name', title: 'Election' },
    { name: 'for', title: `${category}` },
    { name: 'noc', title: ' Contestants' },
    { name: 'active', title: 'Active' },
  ]
  const detailColumns = [
    { name: 'name', title: 'Election' },
    { name: 'noc', title: ' Contestants' },
    { name: 'active', title: 'Active' },
  ]
  
  const changeAddedRows = value => onAddedRowsChangeElection(
    value.map(election => (Object.keys(election).length ? election : {
        name: '',
        for: '',
        noc: '0',
        active: "false"
      })
    )
  )

  // Changes that are committed by the edit functionality
  const commitChanges = async ({ added, changed, deleted }) => {
    if (added) {
      if (faculty_id)  {
        let data = {...added[0], category: category, active: false, _id: faculty_id}
        await createElection(data)
        getFaculties()
      } else if (department_id)  {
        let data = {...added[0], category: category, active: false, _id: department_id}
        await createElection(data)
        getDepartments()
      } else {
        let data = {...added[0], category: category, active: false}
        await createElections(data)
        getElections()
      }     
    }
    if (changed) {
      const id = Object.getOwnPropertyNames(changed)[0]
      // Ensure that there are updates, else return
      if (!changed[id]) return
      const data = { _id: id, ...changed[id] }
      await editElection(data)
      if (department_id) return getDepartments()
      if (faculty_id) return getFaculties()
    }
    if (deleted) {
      await deleteElection({_id: deleted[0]})
      if (department_id) return getDepartments()
      if (faculty_id) return getFaculties()
    }
  }
  rows = elections.filter( election => election.category === category).map( election => ({
    ...election,
    for: election.department ? election.department.abv : election.faculty ? election.faculty.abv : "GENERAL",
    noc: election.contestants.length || 0,
    active: election.active ? "Yes": "No"
  }))
  
  return <Paper>
    {!row && <Grid
      rows={rows}
      columns={columns}
      getRowId={getRowId}
    >
       <SearchState
          value={searchValue}
          onValueChange={onValueChangeElection}
        />
      <SortingState
        sorting={sorting}
        onSortingChange={onSortingChangeElection}
      />
      <GroupingState
        grouping={grouping}
        onGroupingChange={onGroupingChangeElection}
        expandedGroups={expandedGroups}
        onExpandedGroupsChange={onExpandedGroupsChangeElection}
      />
      <PagingState
        currentPage={currentPage}
        onCurrentPageChange={onCurrentPageChangeElection}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChangeElection}
      />
      
      <EditingState
          editingRowIds={editingRowIds}
          onEditingRowIdsChange={onEditingRowIdsChangeElection}
          rowChanges={rowChanges}
          onRowChangesChange={onRowchangesChangeElection}
          addedRows={addedRows}
          onAddedRowsChange={changeAddedRows}
          onCommitChanges={commitChanges}
        />

      <RowDetailState
        expandedRowIds={expandedRowIds}
        onExpandedRowIdsChange={onExpandedRowIdsChangeElection}
      />

      <IntegratedFiltering />
      <IntegratedSorting />
      <IntegratedGrouping />
      <IntegratedPaging />

      <DragDropProvider />

      <Table />

      <TableColumnResizing
        columnWidths={columnWidths}
        onColumnWidthsChange={onColumnWidthsChangeElection}
      />
      <TableHeaderRow showSortingControls />
      <TableEditRow />
      <TableEditColumn
        width={170}
        showAddCommand={!addedRows.length}
        showEditCommand
        showDeleteCommand
        commandComponent={Command}
      />
      <TableColumnReordering
        order={columnOrder}
        onOrderChange={onColumnOrderChangeElection}
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
    </Grid>}    
    {row && <Grid
      rows={row}
      columns={detailColumns}      
      getRowId={getRowId}
    >
      <SortingState
        sorting={sorting}
        onSortingChange={onSortingChangeElection}
      />
      
      <EditingState
          editingRowIds={editingRowIds}
          onEditingRowIdsChange={onEditingRowIdsChangeElection}
          rowChanges={rowChanges}
          onRowChangesChange={onRowchangesChangeElection}
          addedRows={addedRows}
          onAddedRowsChange={changeAddedRows}
          onCommitChanges={commitChanges}
        />
      <IntegratedSorting />

      <Table />

      <TableColumnResizing
        columnWidths={columnWidths}
        onColumnWidthsChange={onColumnWidthsChangeElection}
      />
      <TableHeaderRow showSortingControls />
      <TableEditRow />
      <TableEditColumn
        width={170}
        showAddCommand={!addedRows.length}
        showEditCommand
        showDeleteCommand
        commandComponent={Command}
      />
      <TableColumnReordering
        order={columnOrder}
        onOrderChange={onColumnOrderChangeElection}
      />
      <TableFixedColumns
          rightColumns={rightFixedColumns}
      />
    </Grid>}
  </Paper>
}
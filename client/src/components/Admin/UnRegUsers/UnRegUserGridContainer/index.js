import React, { useState, useEffect, } from 'react'
import Paper from '@material-ui/core/Paper'
import {
  IconButton,
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
  SearchPanel, TableGroupRow, 
  GroupingPanel, PagingPanel, DragDropProvider, TableColumnReordering, TableColumnResizing, Toolbar,
} from '@devexpress/dx-react-grid-material-ui'

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
  { name: 'matNo', title: 'Matric Number' },
  { name: 'phoneNo', title: 'Phone Number' },
]

const getRowId = unRegUser => unRegUser._id

export default ({
  unRegUsers,
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
  createUnRegUser,
  getUnRegUsers,
  editUnRegUser,
  deleteUnRegUser,
  onExpandedGroupsChangeUnRegUser,
  onValueChangeUnRegUser,
  onCurrentPageChangeUnRegUser,
  onPageSizeChangeUnRegUser,
  onEditingRowIdsChangeUnRegUser,
  onRowchangesChangeUnRegUser,
  onExpandedRowIdsChangeUnRegUser,
  onColumnWidthsChangeUnRegUser,
  onColumnOrderChangeUnRegUser,
  onGroupingChangeUnRegUser,
  onSortingChangeUnRegUser,
  onAddedRowsChangeUnRegUser,
}) => {

  useEffect(() => {
    getUnRegUsers()
  }, [])

  const [rightFixedColumns] = useState([TableEditColumn.COLUMN_TYPE])
  
  const changeAddedRows = value => onAddedRowsChangeUnRegUser(
    value.map(unRegUser => (Object.keys(unRegUser).length ? unRegUser : {
        matNo: '',
        phoneNo: ''
      })
    )
  )


  // Changes that are committed by the edit functionality
  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
     createUnRegUser(added[0])
    }
    if (changed) {
      const id = Object.getOwnPropertyNames(changed)[0]
      // Ensure that there are updates, else return
      if (!changed[id]) return
      const data = { _id: id, ...changed[id]}
      editUnRegUser(data)
    }
    if (deleted) {
      deleteUnRegUser({_id: deleted[0]})
    }
  }

  
  return <Paper>
    <Grid
      rows={unRegUsers}
      columns={columns}
      getRowId={getRowId}
    >
       <SearchState
          value={searchValue}
          onValueChange={onValueChangeUnRegUser}
        />
      <SortingState
        sorting={sorting}
        onSortingChange={onSortingChangeUnRegUser}
      />
      <GroupingState
        grouping={grouping}
        onGroupingChange={onGroupingChangeUnRegUser}
        expandedGroups={expandedGroups}
        onExpandedGroupsChange={onExpandedGroupsChangeUnRegUser}
      />
      <PagingState
        currentPage={currentPage}
        onCurrentPageChange={onCurrentPageChangeUnRegUser}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChangeUnRegUser}
      />
      
      <EditingState
          editingRowIds={editingRowIds}
          onEditingRowIdsChange={onEditingRowIdsChangeUnRegUser}
          rowChanges={rowChanges}
          onRowChangesChange={onRowchangesChangeUnRegUser}
          addedRows={addedRows}
          onAddedRowsChange={changeAddedRows}
          onCommitChanges={commitChanges}
        />

      <RowDetailState
        expandedRowIds={expandedRowIds}
        onExpandedRowIdsChange={onExpandedRowIdsChangeUnRegUser}
      />

      <IntegratedFiltering />
      <IntegratedSorting />
      <IntegratedGrouping />
      <IntegratedPaging />

      <DragDropProvider />

      <Table />

      <TableColumnResizing
        columnWidths={columnWidths}
        onColumnWidthsChange={onColumnWidthsChangeUnRegUser}
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
        onOrderChange={onColumnOrderChangeUnRegUser}
      />
      <TableGroupRow />
      <TableFixedColumns
          rightColumns={rightFixedColumns}
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
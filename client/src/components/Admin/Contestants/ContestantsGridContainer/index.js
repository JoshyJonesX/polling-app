import React, { useState,  } from 'react'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import Add from "@material-ui/icons/Add"

import {
  SortingState, EditingState, IntegratedSorting,
} from '@devexpress/dx-react-grid'

import {
  Grid, Table, TableHeaderRow, TableEditRow, TableEditColumn, TableFixedColumns,
  TableColumnReordering, TableColumnResizing,
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



const getRowId = contestants => contestants._id

export default ({
  row,
  election_id,
  grid: {
    editingRowIds,
    rowChanges,
    addedRows,
    sorting,
    columnOrder,
    columnWidths,
  },
  getElections,
  createContestant,
  editContestant,
  deleteContestant,
  onEditingRowIdsChangeContestant,
  onRowchangesChangeContestant,
  onColumnOrderChangeContestant,
  onColumnWidthsChangeContestant,
  onSortingChangeContestant,
  onAddedRowsChangeContestant,
}) => {
  const [rightFixedColumns] = useState([TableEditColumn.COLUMN_TYPE])
  const columns = [
    { name: 'fName', title: 'First Name' },
    { name: 'lName', title: 'Last Name' },
    { name: 'matNo', title: 'Matric Number' },
    { name: 'votes', title: 'Votes' },
  ]
  const changeAddedRows = value => onAddedRowsChangeContestant(
    value.map(contestant => (Object.keys(contestant).length ? contestant : {
        fName: '',
        lName: '',
        matNo: '',
        votes: '',
      })
    )
  )

  // Changes that are committed by the edit functionality
  const commitChanges = async ({ added, changed, deleted }) => {
    if (added) {
        await createContestant({...added[0], election_id})
        getElections()
    }
    if (changed) {
      const id = Object.getOwnPropertyNames(changed)[0]
      // Ensure that there are updates, else return
      if (!changed[id]) return
      const data = { _id: id, ...changed[id], election_id }
      await editContestant(data)
      getElections()
    }
    if (deleted) {
      await deleteContestant({_id: deleted[0], election_id})
      getElections()
    }
  }
  return <Paper>
    <Grid
      rows={row}
      columns={columns}      
      getRowId={getRowId}
    >
      <SortingState
        sorting={sorting}
        onSortingChange={onSortingChangeContestant}
      />
      
      <EditingState
          editingRowIds={editingRowIds}
          onEditingRowIdsChange={onEditingRowIdsChangeContestant}
          rowChanges={rowChanges}
          onRowChangesChange={onRowchangesChangeContestant}
          addedRows={addedRows}
          onAddedRowsChange={changeAddedRows}
          onCommitChanges={commitChanges}
        />
      <IntegratedSorting />

      <Table />

      <TableColumnResizing
        columnWidths={columnWidths}
        onColumnWidthsChange={onColumnWidthsChangeContestant}
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
        onOrderChange={onColumnOrderChangeContestant}
      />
      <TableFixedColumns
          rightColumns={rightFixedColumns}
      />
    </Grid>
  </Paper>
}
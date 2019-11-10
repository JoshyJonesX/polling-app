import React, { useState, useEffect, } from 'react'
import Paper from '@material-ui/core/Paper'
import {
  IconButton,
} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete'

import {
  SortingState, PagingState, GroupingState, RowDetailState, EditingState, SearchState,
  IntegratedFiltering, IntegratedGrouping, IntegratedPaging, IntegratedSorting, 
} from '@devexpress/dx-react-grid'
import {
  Grid, Table, TableHeaderRow, TableEditRow, TableEditColumn, TableFixedColumns,
  SearchPanel, TableGroupRow,
  GroupingPanel, PagingPanel, DragDropProvider, TableColumnReordering, TableColumnResizing, Toolbar,
} from '@devexpress/dx-react-grid-material-ui'


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

const commandComponents = {
  delete: DeleteButton,
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
  { name: 'matNo', title: ' Matric Number' },
  { name: 'username', title: 'Username' },
  { name: 'level', title: 'Level' },
  { name: 'faculty', title: 'Faculty' },
  { name: 'department', title: 'Department' },
  { name: 'role', title: 'Role' }
]

const getRowId = student => student._id

export default ({
  students,
  grid: {
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
  getStudents,
  deleteStudent,
  onExpandedGroupsChangeStudent,
  onValueChangeStudent,
  onCurrentPageChangeStudent,
  onPageSizeChangeStudent,
  onExpandedRowIdsChangeStudent,
  onColumnWidthsChangeStudent,
  onColumnOrderChangeStudent,
  onGroupingChangeStudent,
  onSortingChangeStudent,
}) => {

  useEffect(() => {
    getStudents()
  }, [])

  const [rightFixedColumns] = useState([TableEditColumn.COLUMN_TYPE])


  // Changes that are committed by the edit functionality
  const commitChanges = ({deleted }) => {
    if (deleted) {
      deleteStudent({_id: deleted[0]})
    }
  }

  students = students.map(student => ({
    ...student,
    faculty: student.faculty.abv,
    department: student.department.abv
  }))

  return <Paper>
    <Grid
      rows={students}
      columns={columns}
      getRowId={getRowId}
    >
       <SearchState
          value={searchValue}
          onValueChange={onValueChangeStudent}
        />
      <SortingState
        sorting={sorting}
        onSortingChange={onSortingChangeStudent}
      />
      <GroupingState
        grouping={grouping}
        onGroupingChange={onGroupingChangeStudent}
        expandedGroups={expandedGroups}
        onExpandedGroupsChange={onExpandedGroupsChangeStudent}
      />
      <PagingState
        currentPage={currentPage}
        onCurrentPageChange={onCurrentPageChangeStudent}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChangeStudent}
      />
      
      <EditingState
          onCommitChanges={commitChanges}
        />

      <RowDetailState
        expandedRowIds={expandedRowIds}
        onExpandedRowIdsChange={onExpandedRowIdsChangeStudent}
      />

      <IntegratedFiltering />
      <IntegratedSorting />
      <IntegratedGrouping />
      <IntegratedPaging />

      <DragDropProvider />

      <Table />

      <TableColumnResizing
        columnWidths={columnWidths}
        onColumnWidthsChange={onColumnWidthsChangeStudent}
      />
      <TableHeaderRow showSortingControls />
      <TableEditRow/>
      <TableEditColumn
        width={100}
        showDeleteCommand
        commandComponent={Command}
      />
      <TableColumnReordering
        order={columnOrder}
        onOrderChange={onColumnOrderChangeStudent}
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
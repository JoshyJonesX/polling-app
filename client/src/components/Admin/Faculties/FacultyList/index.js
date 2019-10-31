import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';


const detailColumns = [
  { name: 'subject', title: 'Subject' },
  { name: 'startDate', title: 'Start Date' },
  { name: 'dueDate', title: 'Due Date' },
  { name: 'priority', title: 'Priority' },
  { name: 'status', title: 'Status' },
];
const tableDetailColumnExtensions = [
  { columnName: 'startDate', width: 115 },
  { columnName: 'dueDate', width: 115 },
  { columnName: 'priority', width: 100 },
  { columnName: 'status', width: 125 },
];


const GridDetailContainerBase = ({ row, classes }) => (
  <div className={classes.detailContainer}>
    <div>
      <h5 className={classes.title}>
        {row.firstName}
        {' '}
        {row.lastName}
&apos;s Tasks:
      </h5>
    </div>
    <Paper>
      <Grid
        rows={row.tasks}
        columns={detailColumns}
      >
        <Table
          columnExtensions={tableDetailColumnExtensions}
        />
        <TableHeaderRow />
      </Grid>
    </Paper>
  </div>
);

const GridDetailContainer = withStyles(styles, { name: 'ReduxIntegrationDemo' })(GridDetailContainerBase);

const ReduxGridDetailContainer = connect(state => state)(GridDetailContainer);

const GridContainer = ({
  rows,
  sorting,
  onSortingChange,
  selection,
  onSelectionChange,
  expandedRowIds,
  onExpandedRowIdsChange,
  grouping,
  onGroupingChange,
  expandedGroups,
  onExpandedGroupsChange,
  filters,
  onFiltersChange,
  currentPage,
  onCurrentPageChange,
  pageSize,
  onPageSizeChange,
  pageSizes,
  columnOrder,
  onColumnOrderChange,
  columnWidths,
  onColumnWidthsChange,
}) => (
  <Paper>
    <Grid
      rows={rows}
      columns={columns}
    >
      <FilteringState
        filters={filters}
        onFiltersChange={onFiltersChange}
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
      <RowDetailState
        expandedRowIds={expandedRowIds}
        onExpandedRowIdsChange={onExpandedRowIdsChange}
      />
      <SelectionState
        selection={selection}
        onSelectionChange={onSelectionChange}
      />

      <IntegratedFiltering />
      <IntegratedSorting />
      <IntegratedGrouping />
      <IntegratedPaging />
      <IntegratedSelection />

      <DragDropProvider />

      <Table />

      <TableColumnResizing
        columnWidths={columnWidths}
        onColumnWidthsChange={onColumnWidthsChange}
      />
      <TableHeaderRow showSortingControls />
      <TableColumnReordering
        order={columnOrder}
        onOrderChange={onColumnOrderChange}
      />

      <TableSelection showSelectAll />
      <TableFilterRow />
      <TableRowDetail
        contentComponent={ReduxGridDetailContainer}
      />
      <TableGroupRow />
      <Toolbar />
      <GroupingPanel showSortingControls />
      <PagingPanel
        pageSizes={pageSizes}
      />
      <TableBandHeader
        columnBands={columnBands}
      />
    </Grid>
  </Paper>
);






const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  onSortingChange: sorting => dispatch(createGridAction('sorting', sorting)),
  onSelectionChange: selection => dispatch(createGridAction('selection', selection)),
  onExpandedRowIdsChange: expandedRowIds => dispatch(createGridAction('expandedRowIds', expandedRowIds)),
  onGroupingChange: grouping => dispatch(createGridAction('grouping', grouping)),
  onExpandedGroupsChange: expandedGroups => dispatch(createGridAction('expandedGroups', expandedGroups)),
  onFiltersChange: filters => dispatch(createGridAction('filters', filters)),
  onCurrentPageChange: currentPage => dispatch(createGridAction('currentPage', currentPage)),
  onPageSizeChange: pageSize => dispatch(createGridAction('pageSize', pageSize)),
  onColumnOrderChange: order => dispatch(createGridAction('columnOrder', order)),
  onColumnWidthsChange: widths => dispatch(createGridAction('columnWidths', widths)),
});

const ReduxGridContainer = connect(mapStateToProps, mapDispatchToProps)(GridContainer);



GridContainerimport { createStore } from 'redux';
import { connect, Provider } from 'react-redux';


const detailColumns = [
  { name: 'subject', title: 'Subject' },
  { name: 'startDate', title: 'Start Date' },
  { name: 'dueDate', title: 'Due Date' },
  { name: 'priority', title: 'Priority' },
  { name: 'status', title: 'Status' },
];
const tableDetailColumnExtensions = [
  { columnName: 'startDate', width: 115 },
  { columnName: 'dueDate', width: 115 },
  { columnName: 'priority', width: 100 },
  { columnName: 'status', width: 125 },
];


const GridDetailContainerBase = ({ row, classes }) => (
  <div className={classes.detailContainer}>
    <div>
      <h5 className={classes.title}>
        {row.firstName}
        {' '}
        {row.lastName}
&apos;s Tasks:
      </h5>
    </div>
    <Paper>
      <Grid
        rows={row.tasks}
        columns={detailColumns}
      >
        <Table
          columnExtensions={tableDetailColumnExtensions}
        />
        <TableHeaderRow />
      </Grid>
    </Paper>
  </div>
);

const GridDetailContainer = withStyles(styles, { name: 'ReduxIntegrationDemo' })(GridDetailContainerBase);

const ReduxGridDetailContainer = connect(state => state)(GridDetailContainer);

const GridContainer = ({
  rows,
  sorting,
  onSortingChange,
  selection,
  onSelectionChange,
  expandedRowIds,
  onExpandedRowIdsChange,
  grouping,
  onGroupingChange,
  expandedGroups,
  onExpandedGroupsChange,
  filters,
  onFiltersChange,
  currentPage,
  onCurrentPageChange,
  pageSize,
  onPageSizeChange,
  pageSizes,
  columnOrder,
  onColumnOrderChange,
  columnWidths,
  onColumnWidthsChange,
}) => (
  <Paper>
    <Grid
      rows={rows}
      columns={columns}
    >
      <FilteringState
        filters={filters}
        onFiltersChange={onFiltersChange}
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
      <RowDetailState
        expandedRowIds={expandedRowIds}
        onExpandedRowIdsChange={onExpandedRowIdsChange}
      />
      <SelectionState
        selection={selection}
        onSelectionChange={onSelectionChange}
      />

      <IntegratedFiltering />
      <IntegratedSorting />
      <IntegratedGrouping />
      <IntegratedPaging />
      <IntegratedSelection />

      <DragDropProvider />

      <Table />

      <TableColumnResizing
        columnWidths={columnWidths}
        onColumnWidthsChange={onColumnWidthsChange}
      />
      <TableHeaderRow showSortingControls />
      <TableColumnReordering
        order={columnOrder}
        onOrderChange={onColumnOrderChange}
      />

      <TableSelection showSelectAll />
      <TableFilterRow />
      <TableRowDetail
        contentComponent={ReduxGridDetailContainer}
      />
      <TableGroupRow />
      <Toolbar />
      <GroupingPanel showSortingControls />
      <PagingPanel
        pageSizes={pageSizes}
      />
      <TableBandHeader
        columnBands={columnBands}
      />
    </Grid>
  </Paper>
);






const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  onSortingChange: sorting => dispatch(createGridAction('sorting', sorting)),
  onSelectionChange: selection => dispatch(createGridAction('selection', selection)),
  onExpandedRowIdsChange: expandedRowIds => dispatch(createGridAction('expandedRowIds', expandedRowIds)),
  onGroupingChange: grouping => dispatch(createGridAction('grouping', grouping)),
  onExpandedGroupsChange: expandedGroups => dispatch(createGridAction('expandedGroups', expandedGroups)),
  onFiltersChange: filters => dispatch(createGridAction('filters', filters)),
  onCurrentPageChange: currentPage => dispatch(createGridAction('currentPage', currentPage)),
  onPageSizeChange: pageSize => dispatch(createGridAction('pageSize', pageSize)),
  onColumnOrderChange: order => dispatch(createGridAction('columnOrder', order)),
  onColumnWidthsChange: widths => dispatch(createGridAction('columnWidths', widths)),
});

const ReduxGridContainer = connect(mapStateToProps, mapDispatchToProps)(GridContainer);



GridContainerimport { createStore } from 'redux';
import { connect, Provider } from 'react-redux';


const detailColumns = [
  { name: 'subject', title: 'Subject' },
  { name: 'startDate', title: 'Start Date' },
  { name: 'dueDate', title: 'Due Date' },
  { name: 'priority', title: 'Priority' },
  { name: 'status', title: 'Status' },
];
const tableDetailColumnExtensions = [
  { columnName: 'startDate', width: 115 },
  { columnName: 'dueDate', width: 115 },
  { columnName: 'priority', width: 100 },
  { columnName: 'status', width: 125 },
];


const GridDetailContainerBase = ({ row, classes }) => (
  <div className={classes.detailContainer}>
    <div>
      <h5 className={classes.title}>
        {row.firstName}
        {' '}
        {row.lastName}
&apos;s Tasks:
      </h5>
    </div>
    <Paper>
      <Grid
        rows={row.tasks}
        columns={detailColumns}
      >
        <Table
          columnExtensions={tableDetailColumnExtensions}
        />
        <TableHeaderRow />
      </Grid>
    </Paper>
  </div>
);

const GridDetailContainer = withStyles(styles, { name: 'ReduxIntegrationDemo' })(GridDetailContainerBase);

const ReduxGridDetailContainer = connect(state => state)(GridDetailContainer);

const GridContainer = ({
  rows,
  sorting,
  onSortingChange,
  selection,
  onSelectionChange,
  expandedRowIds,
  onExpandedRowIdsChange,
  grouping,
  onGroupingChange,
  expandedGroups,
  onExpandedGroupsChange,
  filters,
  onFiltersChange,
  currentPage,
  onCurrentPageChange,
  pageSize,
  onPageSizeChange,
  pageSizes,
  columnOrder,
  onColumnOrderChange,
  columnWidths,
  onColumnWidthsChange,
}) => (
  <Paper>
    <Grid
      rows={rows}
      columns={columns}
    >
      <FilteringState
        filters={filters}
        onFiltersChange={onFiltersChange}
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
      <RowDetailState
        expandedRowIds={expandedRowIds}
        onExpandedRowIdsChange={onExpandedRowIdsChange}
      />
      <SelectionState
        selection={selection}
        onSelectionChange={onSelectionChange}
      />

      <IntegratedFiltering />
      <IntegratedSorting />
      <IntegratedGrouping />
      <IntegratedPaging />
      <IntegratedSelection />

      <DragDropProvider />

      <Table />

      <TableColumnResizing
        columnWidths={columnWidths}
        onColumnWidthsChange={onColumnWidthsChange}
      />
      <TableHeaderRow showSortingControls />
      <TableColumnReordering
        order={columnOrder}
        onOrderChange={onColumnOrderChange}
      />

      <TableSelection showSelectAll />
      <TableFilterRow />
      <TableRowDetail
        contentComponent={ReduxGridDetailContainer}
      />
      <TableGroupRow />
      <Toolbar />
      <GroupingPanel showSortingControls />
      <PagingPanel
        pageSizes={pageSizes}
      />
      <TableBandHeader
        columnBands={columnBands}
      />
    </Grid>
  </Paper>
);






const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  onSortingChange: sorting => dispatch(createGridAction('sorting', sorting)),
  onSelectionChange: selection => dispatch(createGridAction('selection', selection)),
  onExpandedRowIdsChange: expandedRowIds => dispatch(createGridAction('expandedRowIds', expandedRowIds)),
  onGroupingChange: grouping => dispatch(createGridAction('grouping', grouping)),
  onExpandedGroupsChange: expandedGroups => dispatch(createGridAction('expandedGroups', expandedGroups)),
  onFiltersChange: filters => dispatch(createGridAction('filters', filters)),
  onCurrentPageChange: currentPage => dispatch(createGridAction('currentPage', currentPage)),
  onPageSizeChange: pageSize => dispatch(createGridAction('pageSize', pageSize)),
  onColumnOrderChange: order => dispatch(createGridAction('columnOrder', order)),
  onColumnWidthsChange: widths => dispatch(createGridAction('columnWidths', widths)),
});

const ReduxGridContainer = connect(mapStateToProps, mapDispatchToProps)(GridContainer);



GridContainerimport { createStore } from 'redux';
import { connect, Provider } from 'react-redux';


const detailColumns = [
  { name: 'subject', title: 'Subject' },
  { name: 'startDate', title: 'Start Date' },
  { name: 'dueDate', title: 'Due Date' },
  { name: 'priority', title: 'Priority' },
  { name: 'status', title: 'Status' },
];
const tableDetailColumnExtensions = [
  { columnName: 'startDate', width: 115 },
  { columnName: 'dueDate', width: 115 },
  { columnName: 'priority', width: 100 },
  { columnName: 'status', width: 125 },
];


const GridDetailContainerBase = ({ row, classes }) => (
  <div className={classes.detailContainer}>
    <div>
      <h5 className={classes.title}>
        {row.firstName}
        {' '}
        {row.lastName}
&apos;s Tasks:
      </h5>
    </div>
    <Paper>
      <Grid
        rows={row.tasks}
        columns={detailColumns}
      >
        <Table
          columnExtensions={tableDetailColumnExtensions}
        />
        <TableHeaderRow />
      </Grid>
    </Paper>
  </div>
);

const GridDetailContainer = withStyles(styles, { name: 'ReduxIntegrationDemo' })(GridDetailContainerBase);

const ReduxGridDetailContainer = connect(state => state)(GridDetailContainer);

const GridContainer = ({
  rows,
  sorting,
  onSortingChange,
  selection,
  onSelectionChange,
  expandedRowIds,
  onExpandedRowIdsChange,
  grouping,
  onGroupingChange,
  expandedGroups,
  onExpandedGroupsChange,
  filters,
  onFiltersChange,
  currentPage,
  onCurrentPageChange,
  pageSize,
  onPageSizeChange,
  pageSizes,
  columnOrder,
  onColumnOrderChange,
  columnWidths,
  onColumnWidthsChange,
}) => (
  <Paper>
    <Grid
      rows={rows}
      columns={columns}
    >
      <FilteringState
        filters={filters}
        onFiltersChange={onFiltersChange}
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
      <RowDetailState
        expandedRowIds={expandedRowIds}
        onExpandedRowIdsChange={onExpandedRowIdsChange}
      />
      <SelectionState
        selection={selection}
        onSelectionChange={onSelectionChange}
      />

      <IntegratedFiltering />
      <IntegratedSorting />
      <IntegratedGrouping />
      <IntegratedPaging />
      <IntegratedSelection />

      <DragDropProvider />

      <Table />

      <TableColumnResizing
        columnWidths={columnWidths}
        onColumnWidthsChange={onColumnWidthsChange}
      />
      <TableHeaderRow showSortingControls />
      <TableColumnReordering
        order={columnOrder}
        onOrderChange={onColumnOrderChange}
      />

      <TableSelection showSelectAll />
      <TableFilterRow />
      <TableRowDetail
        contentComponent={ReduxGridDetailContainer}
      />
      <TableGroupRow />
      <Toolbar />
      <GroupingPanel showSortingControls />
      <PagingPanel
        pageSizes={pageSizes}
      />
      <TableBandHeader
        columnBands={columnBands}
      />
    </Grid>
  </Paper>
);






const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  onSortingChange: sorting => dispatch(createGridAction('sorting', sorting)),
  onSelectionChange: selection => dispatch(createGridAction('selection', selection)),
  onExpandedRowIdsChange: expandedRowIds => dispatch(createGridAction('expandedRowIds', expandedRowIds)),
  onGroupingChange: grouping => dispatch(createGridAction('grouping', grouping)),
  onExpandedGroupsChange: expandedGroups => dispatch(createGridAction('expandedGroups', expandedGroups)),
  onFiltersChange: filters => dispatch(createGridAction('filters', filters)),
  onCurrentPageChange: currentPage => dispatch(createGridAction('currentPage', currentPage)),
  onPageSizeChange: pageSize => dispatch(createGridAction('pageSize', pageSize)),
  onColumnOrderChange: order => dispatch(createGridAction('columnOrder', order)),
  onColumnWidthsChange: widths => dispatch(createGridAction('columnWidths', widths)),
});

const ReduxGridContainer = connect(mapStateToProps, mapDispatchToProps)(GridContainer);



GridContainerimport { createStore } from 'redux';
import { connect, Provider } from 'react-redux';


const detailColumns = [
  { name: 'subject', title: 'Subject' },
  { name: 'startDate', title: 'Start Date' },
  { name: 'dueDate', title: 'Due Date' },
  { name: 'priority', title: 'Priority' },
  { name: 'status', title: 'Status' },
];
const tableDetailColumnExtensions = [
  { columnName: 'startDate', width: 115 },
  { columnName: 'dueDate', width: 115 },
  { columnName: 'priority', width: 100 },
  { columnName: 'status', width: 125 },
];


const GridDetailContainerBase = ({ row, classes }) => (
  <div className={classes.detailContainer}>
    <div>
      <h5 className={classes.title}>
        {row.firstName}
        {' '}
        {row.lastName}
&apos;s Tasks:
      </h5>
    </div>
    <Paper>
      <Grid
        rows={row.tasks}
        columns={detailColumns}
      >
        <Table
          columnExtensions={tableDetailColumnExtensions}
        />
        <TableHeaderRow />
      </Grid>
    </Paper>
  </div>
);

const GridDetailContainer = withStyles(styles, { name: 'ReduxIntegrationDemo' })(GridDetailContainerBase);

const ReduxGridDetailContainer = connect(state => state)(GridDetailContainer);

const GridContainer = ({
  rows,
  sorting,
  onSortingChange,
  selection,
  onSelectionChange,
  expandedRowIds,
  onExpandedRowIdsChange,
  grouping,
  onGroupingChange,
  expandedGroups,
  onExpandedGroupsChange,
  filters,
  onFiltersChange,
  currentPage,
  onCurrentPageChange,
  pageSize,
  onPageSizeChange,
  pageSizes,
  columnOrder,
  onColumnOrderChange,
  columnWidths,
  onColumnWidthsChange,
}) => (
  <Paper>
    <Grid
      rows={rows}
      columns={columns}
    >
      <FilteringState
        filters={filters}
        onFiltersChange={onFiltersChange}
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
      <RowDetailState
        expandedRowIds={expandedRowIds}
        onExpandedRowIdsChange={onExpandedRowIdsChange}
      />
      <SelectionState
        selection={selection}
        onSelectionChange={onSelectionChange}
      />

      <IntegratedFiltering />
      <IntegratedSorting />
      <IntegratedGrouping />
      <IntegratedPaging />
      <IntegratedSelection />

      <DragDropProvider />

      <Table />

      <TableColumnResizing
        columnWidths={columnWidths}
        onColumnWidthsChange={onColumnWidthsChange}
      />
      <TableHeaderRow showSortingControls />
      <TableColumnReordering
        order={columnOrder}
        onOrderChange={onColumnOrderChange}
      />

      <TableSelection showSelectAll />
      <TableFilterRow />
      <TableRowDetail
        contentComponent={ReduxGridDetailContainer}
      />
      <TableGroupRow />
      <Toolbar />
      <GroupingPanel showSortingControls />
      <PagingPanel
        pageSizes={pageSizes}
      />
      <TableBandHeader
        columnBands={columnBands}
      />
    </Grid>
  </Paper>
);






const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  onSortingChange: sorting => dispatch(createGridAction('sorting', sorting)),
  onSelectionChange: selection => dispatch(createGridAction('selection', selection)),
  onExpandedRowIdsChange: expandedRowIds => dispatch(createGridAction('expandedRowIds', expandedRowIds)),
  onGroupingChange: grouping => dispatch(createGridAction('grouping', grouping)),
  onExpandedGroupsChange: expandedGroups => dispatch(createGridAction('expandedGroups', expandedGroups)),
  onFiltersChange: filters => dispatch(createGridAction('filters', filters)),
  onCurrentPageChange: currentPage => dispatch(createGridAction('currentPage', currentPage)),
  onPageSizeChange: pageSize => dispatch(createGridAction('pageSize', pageSize)),
  onColumnOrderChange: order => dispatch(createGridAction('columnOrder', order)),
  onColumnWidthsChange: widths => dispatch(createGridAction('columnWidths', widths)),
});

const ReduxGridContainer = connect(mapStateToProps, mapDispatchToProps)(GridContainer);



GridContainer
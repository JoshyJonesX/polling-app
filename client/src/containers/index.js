import { connect } from 'react-redux'
import { authUser } from "../store/actions/auth"
import { removeError } from "../store/actions/errors"
import createGridAction from "../store/actions/grid"
import { 
    createFaculty,
    getFaculties,
    editFaculty,
    deleteFaculty
  } from "../store/actions/faculties"
import { 
    createDepartment,
    getDepartments,
    editDepartment,
    deleteDepartment
  } from "../store/actions/departments"
import { withRouter } from "react-router-dom"
import ResponsiveDrawer from "../components/Layout"
import FacultyGridContainerComponent from "../components/Admin/Faculties/FacultyGridContainer"
import DepartmentGridContainerComponent from "../components/Admin/Departments/DepartmentsGridContainer"

export const Layout = withRouter(connect(null,null)(ResponsiveDrawer))

export const FacultyGridContainer = connect(
    state => 
        ({
            faculties: state.faculties,
            errors: state.errors,
            grid: {
                ...state.Facultygrid,
                columnOrder: ['name', 'abv', 'nod', 'noe']},
                columnWidths: [
                    { columnName: 'name', width: 200 },
                    { columnName: 'abv', width: 100 },
                    { columnName: 'nod', width: 200 },
                    { columnName: 'noe', width: 170 }
                ],
        }),
        dispatch => ({
            onAddedRowsChange: addedRows => dispatch(createGridAction('addedRows', addedRows)),
            onEditingRowIdsChange: editingRowIds => dispatch(createGridAction('editingRowIds', editingRowIds)),
            onRowchangesChange: rowChanges => dispatch(createGridAction('rowChanges', rowChanges)),
            onSortingChange: sorting => dispatch(createGridAction('sorting', sorting)),
            onExpandedRowIdsChange: expandedRowIds => dispatch(createGridAction('expandedRowIds', expandedRowIds)),
            onGroupingChange: grouping => dispatch(createGridAction('grouping', grouping)),
            onExpandedGroupsChange: expandedGroups => dispatch(createGridAction('expandedGroups', expandedGroups)),
            onValueChange: searchValue => dispatch(createGridAction('searchValue', searchValue)),
            onCurrentPageChange: currentPage => dispatch(createGridAction('currentPage', currentPage)),
            onPageSizeChange: pageSize => dispatch(createGridAction('pageSize', pageSize)),
            onColumnOrderChange: order => dispatch(createGridAction('columnOrder', order)),
            onColumnWidthsChange: widths => dispatch(createGridAction('columnWidths', widths)),
            createFaculty: faculty => dispatch(createFaculty(faculty)),
            getFaculties: () => dispatch(getFaculties()),
            editFaculty: faculty => dispatch(editFaculty(faculty)),
            deleteFaculty: faculty => dispatch(deleteFaculty(faculty))
          })
)(FacultyGridContainerComponent)

export const DepartmentGridContainer = connect(
    state => 
        ({
            faculties: state.faculties,
            departments: state.departments,
            errors: state.errors,
            grid: {
                ...state.Departmentgrid,
                columnOrder: ['name', 'abv', 'faculty', 'nos', 'noe'],
                columnWidths: [
                    { columnName: 'name', width: 200 },
                    { columnName: 'abv', width: 100 },
                    { columnName: 'faculty', width: 150 },
                    { columnName: 'nos', width: 200 },
                    { columnName: 'noe', width: 170 }
                ],
            }
        }),
        dispatch => ({
            onAddedRowsChange: addedRows => dispatch(createGridAction('addedRows', addedRows)),
            onEditingRowIdsChange: editingRowIds => dispatch(createGridAction('editingRowIds', editingRowIds)),
            onRowchangesChange: rowChanges => dispatch(createGridAction('rowChanges', rowChanges)),
            onSortingChange: sorting => dispatch(createGridAction('sorting', sorting)),
            onExpandedRowIdsChange: expandedRowIds => dispatch(createGridAction('expandedRowIds', expandedRowIds)),
            onGroupingChange: grouping => dispatch(createGridAction('grouping', grouping)),
            onExpandedGroupsChange: expandedGroups => dispatch(createGridAction('expandedGroups', expandedGroups)),
            onValueChange: searchValue => dispatch(createGridAction('searchValue', searchValue)),
            onCurrentPageChange: currentPage => dispatch(createGridAction('currentPage', currentPage)),
            onPageSizeChange: pageSize => dispatch(createGridAction('pageSize', pageSize)),
            onColumnOrderChange: order => dispatch(createGridAction('columnOrder', order)),
            onColumnWidthsChange: widths => dispatch(createGridAction('columnWidths', widths)),
            createDepartment: department => dispatch(createDepartment(department)),
            getDepartments: () => dispatch(getDepartments()),
            editDepartment: department => dispatch(editDepartment(department)),
            deleteDepartment: department => dispatch(deleteDepartment(department)),
            getFaculties: () => dispatch(getFaculties()),
          })
)(DepartmentGridContainerComponent)
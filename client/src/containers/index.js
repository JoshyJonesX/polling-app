import { connect } from 'react-redux'
import { authUser, otpAuth } from "../store/actions/auth"
// import { removeError } from "../store/actions/errors"
import {
    createGridActionFaculty,
    createGridActionDepartment,
    createGridActionElection,
    createGridActionStudent,
    createGridActionUnRegUser,
    createGridActionContestant
} from "../store/actions/grid"
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
import { 
    createElection,
    createElections,
    getElections,
    editElection,
    deleteElection,
  } from "../store/actions/elections"
import {
    getStudents,
    deleteStudent,
  } from "../store/actions/students"
import { 
    createUnRegUser,
    getUnRegUsers,
    editUnRegUser,
    deleteUnRegUser,
  } from "../store/actions/unRegUsers"
import { 
    createContestant,
    editContestant,
    deleteContestant,
  } from "../store/actions/contestants"
import { withRouter } from "react-router-dom"
import ResponsiveDrawer from "../components/Layout"
import FacultyGridContainerComponent from "../components/Admin/Faculties/FacultyGridContainer"
import DepartmentGridContainerComponent from "../components/Admin/Departments/DepartmentsGridContainer"
import ElectionGridContainerComponent from "../components/Admin/Elections/ElectionGridContainer"
import StudentGridContainerComponent from "../components/Admin/Students/StudentGridContainer"
import UnRegUserGridContainerComponent from "../components/Admin/UnRegUsers/UnRegUserGridContainer"
import ContestantsGridContainerComponent from "../components/Admin/Contestants/ContestantsGridContainer"

import AuthenticationComponent from "../components/User/Authentication"
import LandingPageComponent from "../components/User/LandingPage"

const matchDispatchToProps = () =>
    dispatch => ({
        onExpandedRowIdsChangeFaculty: expandedRowIds => dispatch(createGridActionFaculty('expandedRowIds', expandedRowIds)),
        onExpandedGroupsChangeFaculty: expandedGroups => dispatch(createGridActionFaculty('expandedGroups', expandedGroups)),
        onValueChangeFaculty: searchValue => dispatch(createGridActionFaculty('searchValue', searchValue)),
        onEditingRowIdsChangeFaculty: editingRowIds => dispatch(createGridActionFaculty('editingRowIds', editingRowIds)),
        onRowchangesChangeFaculty: rowChanges => dispatch(createGridActionFaculty('rowChanges', rowChanges)),
        onCurrentPageChangeFaculty: currentPage => dispatch(createGridActionFaculty('currentPage', currentPage)),
        onPageSizeChangeFaculty: pageSize => dispatch(createGridActionFaculty('pageSize', pageSize)),
        onAddedRowsChangeFaculty:addedRows => dispatch(createGridActionFaculty('addedRows', addedRows)),
        onSortingChangeFaculty:sorting => dispatch(createGridActionFaculty('sorting', sorting)),
        onGroupingChangeFaculty:grouping => dispatch(createGridActionFaculty('grouping', grouping)),
        onColumnOrderChangeFaculty:order => dispatch(createGridActionFaculty('columnOrder', order)),
        onColumnWidthsChangeFaculty:widths => dispatch(createGridActionFaculty('columnWidths', widths)),

        onExpandedRowIdsChangeElection: expandedRowIds => dispatch(createGridActionElection('expandedRowIds', expandedRowIds)),
        onExpandedGroupsChangeElection: expandedGroups => dispatch(createGridActionElection('expandedGroups', expandedGroups)),
        onValueChangeElection: searchValue => dispatch(createGridActionElection('searchValue', searchValue)),
        onEditingRowIdsChangeElection: editingRowIds => dispatch(createGridActionElection('editingRowIds', editingRowIds)),
        onRowchangesChangeElection: rowChanges => dispatch(createGridActionElection('rowChanges', rowChanges)),
        onCurrentPageChangeElection: currentPage => dispatch(createGridActionElection('currentPage', currentPage)),
        onPageSizeChangeElection: pageSize => dispatch(createGridActionElection('pageSize', pageSize)),
        onAddedRowsChangeElection: addedRows => dispatch(createGridActionElection('addedRows', addedRows)),
        onSortingChangeElection: sorting => dispatch(createGridActionElection('sorting', sorting)),
        onGroupingChangeElection: grouping => dispatch(createGridActionElection('grouping', grouping)),
        onColumnOrderChangeElection: order => dispatch(createGridActionElection('columnOrder', order)),
        onColumnWidthsChangeElection: widths => dispatch(createGridActionElection('columnWidths', widths)),
        
        onExpandedRowIdsChangeDepartment: expandedRowIds => dispatch(createGridActionDepartment('expandedRowIds', expandedRowIds)),
        onExpandedGroupsChangeDepartment: expandedGroups => dispatch(createGridActionDepartment('expandedGroups', expandedGroups)),
        onValueChangeDepartment: searchValue => dispatch(createGridActionDepartment('searchValue', searchValue)),
        onEditingRowIdsChangeDepartment: editingRowIds => dispatch(createGridActionDepartment('editingRowIds', editingRowIds)),
        onRowchangesChangeDepartment: rowChanges => dispatch(createGridActionDepartment('rowChanges', rowChanges)),
        onCurrentPageChangeDepartment: currentPage => dispatch(createGridActionDepartment('currentPage', currentPage)),
        onPageSizeChangeDepartment: pageSize => dispatch(createGridActionDepartment('pageSize', pageSize)),
        onAddedRowsChangeDepartment: addedRows => dispatch(createGridActionDepartment('addedRows', addedRows)),
        onSortingChangeDepartment: sorting => dispatch(createGridActionDepartment('sorting', sorting)),
        onGroupingChangeDepartment: grouping => dispatch(createGridActionDepartment('grouping', grouping)),
        onColumnOrderChangeDepartment: order => dispatch(createGridActionDepartment('columnOrder', order)),
        onColumnWidthsChangeDepartment: widths => dispatch(createGridActionDepartment('columnWidths', widths)),
        
        onExpandedRowIdsChangeStudent: expandedRowIds => dispatch(createGridActionStudent('expandedRowIds', expandedRowIds)),
        onExpandedGroupsChangeStudent: expandedGroups => dispatch(createGridActionStudent('expandedGroups', expandedGroups)),
        onValueChangeStudent: searchValue => dispatch(createGridActionStudent('searchValue', searchValue)),
        onEditingRowIdsChangeStudent: editingRowIds => dispatch(createGridActionStudent('editingRowIds', editingRowIds)),
        onRowchangesChangeStudent: rowChanges => dispatch(createGridActionStudent('rowChanges', rowChanges)),
        onCurrentPageChangeStudent: currentPage => dispatch(createGridActionStudent('currentPage', currentPage)),
        onPageSizeChangeStudent: pageSize => dispatch(createGridActionStudent('pageSize', pageSize)),
        onAddedRowsChangeStudent: addedRows => dispatch(createGridActionStudent('addedRows', addedRows)),
        onSortingChangeStudent: sorting => dispatch(createGridActionStudent('sorting', sorting)),
        onGroupingChangeStudent: grouping => dispatch(createGridActionStudent('grouping', grouping)),
        onColumnOrderChangeStudent: order => dispatch(createGridActionStudent('columnOrder', order)),
        onColumnWidthsChangeStudent: widths => dispatch(createGridActionStudent('columnWidths', widths)),
        
        onExpandedRowIdsChangeUnRegUser: expandedRowIds => dispatch(createGridActionUnRegUser('expandedRowIds', expandedRowIds)),
        onExpandedGroupsChangeUnRegUser: expandedGroups => dispatch(createGridActionUnRegUser('expandedGroups', expandedGroups)),
        onValueChangeUnRegUser: searchValue => dispatch(createGridActionUnRegUser('searchValue', searchValue)),
        onEditingRowIdsChangeUnRegUser: editingRowIds => dispatch(createGridActionUnRegUser('editingRowIds', editingRowIds)),
        onRowchangesChangeUnRegUser: rowChanges => dispatch(createGridActionUnRegUser('rowChanges', rowChanges)),
        onCurrentPageChangeUnRegUser: currentPage => dispatch(createGridActionUnRegUser('currentPage', currentPage)),
        onPageSizeChangeUnRegUser: pageSize => dispatch(createGridActionUnRegUser('pageSize', pageSize)),
        onAddedRowsChangeUnRegUser: addedRows => dispatch(createGridActionUnRegUser('addedRows', addedRows)),
        onSortingChangeUnRegUser: sorting => dispatch(createGridActionUnRegUser('sorting', sorting)),
        onGroupingChangeUnRegUser: grouping => dispatch(createGridActionUnRegUser('grouping', grouping)),
        onColumnOrderChangeUnRegUser: order => dispatch(createGridActionUnRegUser('columnOrder', order)),
        onColumnWidthsChangeUnRegUser: widths => dispatch(createGridActionUnRegUser('columnWidths', widths)),
        
        onEditingRowIdsChangeContestant: editingRowIds => dispatch(createGridActionContestant('editingRowIds', editingRowIds)),
        onRowchangesChangeContestant: rowChanges => dispatch(createGridActionContestant('rowChanges', rowChanges)),
        onColumnOrderChangeContestant: order => dispatch(createGridActionContestant('columnOrder', order)),
        onColumnWidthsChangeContestant: widths => dispatch(createGridActionContestant('columnWidths', widths)),
        onAddedRowsChangeContestant: addedRows => dispatch(createGridActionContestant('addedRows', addedRows)),
        onSortingChangeContestant: sorting => dispatch(createGridActionContestant('sorting', sorting)),
        
        createFaculty: faculty => dispatch(createFaculty(faculty)),
        getFaculties: () => dispatch(getFaculties()),
        editFaculty: faculty => dispatch(editFaculty(faculty)),
        deleteFaculty: faculty => dispatch(deleteFaculty(faculty)),

        createDepartment: department => dispatch(createDepartment(department)),
        getDepartments: () => dispatch(getDepartments()),
        editDepartment: department => dispatch(editDepartment(department)),
        deleteDepartment: department => dispatch(deleteDepartment(department)),
        
        createElection: election => dispatch(createElection(election)),
        createElections: election => dispatch(createElections(election)),
        getElections: () => dispatch(getElections()),
        editElection: election => dispatch(editElection(election)),
        deleteElection: election => dispatch(deleteElection(election)),
        
        getStudents: () => dispatch(getStudents()),
        deleteStudent: student => dispatch(deleteStudent(student)),
        
        createUnRegUser: unRegUser => dispatch(createUnRegUser(unRegUser)),
        getUnRegUsers: () => dispatch(getUnRegUsers()),
        editUnRegUser: unRegUser => dispatch(editUnRegUser(unRegUser)),
        deleteUnRegUser: unRegUser => dispatch(deleteUnRegUser(unRegUser)),
        
        createContestant: contestant => dispatch(createContestant(contestant)),
        editContestant: contestant => dispatch(editContestant(contestant)),
        deleteContestant: contestant => dispatch(deleteContestant(contestant)),
    })

export const Layout = withRouter(connect(null,null)(ResponsiveDrawer))

export const FacultyGridContainer = connect(
    state => 
        ({
            faculties: state.faculties,
            errors: state.errors,
            grid: state.facultyGrid
        }),
        matchDispatchToProps
)(FacultyGridContainerComponent)

export const DepartmentGridContainer = connect(
    state => 
        ({
            faculties: state.faculties,
            departments: state.departments,
            errors: state.errors,
            grid: state.departmentGrid
        }),
        matchDispatchToProps
)(DepartmentGridContainerComponent)

export const ElectionGridContainer = connect(
    state => 
        ({
            faculties: state.faculties,
            departments: state.departments,
            elections: state.elections,
            errors: state.errors,
            grid: state.electionGrid
        }),
        matchDispatchToProps
)(ElectionGridContainerComponent)

export const StudentGridContainer = connect(
    state => 
        ({
            students: state.students,
            errors: state.errors,
            grid: state.studentGrid
        }),
        matchDispatchToProps
)(StudentGridContainerComponent)

export const UnRegUserGridContainer = connect(
    state => 
        ({
            unRegUsers: state.unRegUser,
            errors: state.errors,
            grid: state.unRegUserGrid
        }),
        matchDispatchToProps
)(UnRegUserGridContainerComponent)

export const ContestantGridContainer = connect(
    state => 
        ({
            errors: state.errors,
            grid: state.contestantGrid
        }),
        matchDispatchToProps
)(ContestantsGridContainerComponent)

export const Authentication = connect(
    state => ({
       otp: state.otp 
    }), { authUser, otpAuth })(AuthenticationComponent)
    
export const LandingPage = connect(null, null)(LandingPageComponent)
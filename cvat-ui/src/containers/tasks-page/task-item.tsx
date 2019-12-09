import React from 'react';
import { connect } from 'react-redux';

import {
    Task,
    TasksQuery,
    CombinedState,
    ActiveInference,
} from '../../reducers/interfaces';

import TaskItemComponent from '../../components/tasks-page/task-item';

import {
    getTasksAsync,
} from '../../actions/tasks-actions';

interface StateToProps {
    deleted: boolean;
    previewImage: string;
    taskInstance: any;
    activeInference: ActiveInference | null;
}

interface DispatchToProps {
    getTasks: (query: TasksQuery) => void;
}

interface OwnProps {
    taskID: number;
    invisible: boolean;
}

function mapStateToProps(state: CombinedState, own: OwnProps): StateToProps {
    const task = state.tasks.current
        .filter((_task: Task) => _task.instance.id === own.taskID)[0];
    const { deletes } = state.tasks.activities;
    const id = own.taskID;

    return {
        deleted: deletes.byTask[id] ? deletes.byTask[id] === true : false,
        previewImage: task.preview,
        taskInstance: task.instance,
        activeInference: state.models.inferences[id] || null,
    };
}

function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        getTasks: (query: TasksQuery): void => {
            dispatch(getTasksAsync(query));
        },
    };
}

type TasksItemContainerProps = StateToProps & DispatchToProps & OwnProps;

function TaskItemContainer(props: TasksItemContainerProps): JSX.Element {
    return (
        <TaskItemComponent {...props} />
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TaskItemContainer);

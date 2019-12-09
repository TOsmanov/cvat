import React from 'react';

import {
    Col,
    Row,
    message,
    Button,
    Pagination,
} from 'antd';

import Text from 'antd/lib/typography/Text';
import TaskItem from '../../containers/tasks-page/task-item';

export interface ContentListProps {
    onSwitchPage(page: number): void;
    currentTasksIndexes: number[];
    hiddenTasksIndexes: number[];
    currentPage: number;
    numberOfTasks: number;
}

interface State {
    showAll: boolean;
}

export default class TaskListComponent extends React.PureComponent<ContentListProps, State> {
    public constructor(props: ContentListProps) {
        super(props);
        this.state = {
            showAll: false,
        };
    }

    public render(): JSX.Element {
        const {
            currentTasksIndexes,
            hiddenTasksIndexes,
            numberOfTasks,
            currentPage,
            onSwitchPage,
        } = this.props;

        const {
            showAll,
        } = this.state;

        const taskIndexes = currentTasksIndexes.concat(hiddenTasksIndexes);
        const taskViews = taskIndexes.map(
            (tid): JSX.Element => (
                <TaskItem
                    invisible={!showAll && hiddenTasksIndexes.includes(tid)}
                    taskID={tid}
                    key={tid}
                />
            ),
        );

        if (!showAll && hiddenTasksIndexes.length) {
            message.info(
                <>
                    <Text>There are some hidden tasks which has not been created yet. </Text>
                    <Button
                        type='link'
                        onClick={(): void => {
                            this.setState({
                                showAll: true,
                            });
                            message.destroy();
                        }}
                    >
                        Show all
                    </Button>
                </>, 7,
            );
        }

        return (
            <>
                <Row type='flex' justify='center' align='middle'>
                    <Col className='cvat-task-list' md={22} lg={18} xl={16} xxl={14}>
                        { taskViews }
                    </Col>
                </Row>
                <Row type='flex' justify='center' align='middle'>
                    <Col md={22} lg={18} xl={16} xxl={14}>
                        <Pagination
                            className='cvat-tasks-pagination'
                            onChange={onSwitchPage}
                            total={numberOfTasks}
                            pageSize={10}
                            current={currentPage}
                            showQuickJumper
                        />
                    </Col>
                </Row>
            </>
        );
    }
}

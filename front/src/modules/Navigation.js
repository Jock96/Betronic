import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../store/tree/actions';
import TreeHelper from '../helpers/TreeHelper';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from 'react-router-dom';
import TreeNodePage from '../components/TreeNodePage/TreeNodePage';

const Navigation = ({
    tree,
    addRoute,
    removeRoute
}) => {
    const flattenTree = React.useMemo(() => {
        const helper = new TreeHelper(tree);
        return helper.flatten();
    }, [tree]);

    return (
        <Router>
            <Switch>
                {
                    flattenTree.map(node => (
                        <Route exact key={node.route} path={node.route}>
                            <TreeNodePage node={node} removeRoute={removeRoute} addRoute={addRoute} flattenTree={flattenTree} />
                        </Route>
                    ))
                }
                <Redirect to={tree.route} />
            </Switch>
        </Router>
    )
};

const mapStateToProps = ({tree}) => ({
    tree
  })
  
const mapDispatchToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
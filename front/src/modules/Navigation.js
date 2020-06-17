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
import RouteTableComponent from '../components/RouteTableComponent/RouteTableComponent';

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
                    flattenTree.map(node => {
                        const isVk = node.nodes.length === 0;
                        const isWa = node.nodes.length === 1;
                        const isGl = node.nodes.length >= 2;
                        return (
                            (
                                <Route exact key={node.route} path={node.route}>
                                    <TreeNodePage 
                                        node={node} 
                                        removeRoute={removeRoute} 
                                        addRoute={addRoute} 
                                        isVk={isVk} 
                                        isWa={isWa} 
                                        isGl={isGl} />
                                    <RouteTableComponent 
                                        flattenTree={flattenTree} 
                                        removeRoute={removeRoute} 
                                        isVk={isVk} 
                                        isWa={isWa} 
                                        isGl={isGl} />
                                </Route>
                            )
                        )
                    })
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
import React, {Component} from 'react';
import { Breadcrumbs as BreadcrumbsUi, Typography, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import { LinkType } from '../models/models';

type BreadcrumbsProps = {
    links: LinkType[],
    current?: string
}

class Breadcrumbs extends Component<BreadcrumbsProps,{}> {


    render() {
        const { links, current } = this.props;
        const breadcrumbs = (links || []).map((link, i) => (
            <Link key={i} color="inherit" component={RouterLink} to={link.to}>
                {link.title}
            </Link>
        ));
        const currentRoute = ( <Typography color="textPrimary">{current}</Typography> );
        return (
            <BreadcrumbsUi aria-label="breadcrumb">
                {breadcrumbs}
                {currentRoute}
            </BreadcrumbsUi>
        );
    }
}

export default Breadcrumbs;

/* eslint-disable jsx-a11y/anchor-has-content */
import React,{forwardRef} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink from '@material-ui/core/Link';

const NextComposed = forwardRef((props, ref) => {
  const { as, href, prefetch, ...other } = props;

  return (
    <NextLink href={href} passHref={true} prefetch={prefetch} as={as} >
      <a ref = {ref} {...other} />
    </NextLink>
  );
})

NextComposed.propTypes = {
  as: PropTypes.string,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  prefetch: PropTypes.bool,
};

/**
* A styled version of the Next.js Link component:
* https://nextjs.org/docs/#with-link
* @component
*/
function Link(props) {
  const { activeClassName, router, className: classNameProps, naked, ...other } = props;

  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === props.href && activeClassName,
  });

  if (naked) {
    return <NextComposed className={className} {...other} />;
  }

  return <MuiLink component={NextComposed} className={className} {...other} />;
}

Link.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

Link.defaultProps = {
  activeClassName: 'active',
};

export default withRouter(Link);

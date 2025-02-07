import type { JSX, Reflection } from 'typedoc';
import type { CustomThemeRenderContext } from '../CustomThemeRenderContext';

export const breadcrumb = (context: CustomThemeRenderContext, props: Reflection): JSX.Element | undefined =>
  props.parent ? (
    <>
      {context.breadcrumb(props.parent)}
      <li>{props.url ? <a href={context.urlTo(props)}>{props.name}</a> : <span>{props.name}</span>}</li>
    </>
  ) : props.url ? (
    <li>
      <a href={context.urlTo(props)}>{props.name}</a>
    </li>
  ) : undefined;
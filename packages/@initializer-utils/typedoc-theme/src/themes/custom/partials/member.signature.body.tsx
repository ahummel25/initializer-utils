import type { CustomThemeRenderContext } from '../CustomThemeRenderContext';
import { JSX, ReflectionType, SignatureReflection } from 'typedoc';
import { renderFlags } from 'typedoc/dist/lib/output/themes/lib';

export const memberSignatureBody = (
    context: CustomThemeRenderContext,
    props: SignatureReflection,
    { hideSources = false }: { hideSources?: boolean } = {}
) => (
	<>
		{!hideSources && context.memberSources(props)}
		{context.comment(props)}

		{!!props.typeParameters && (
			<>
				<h4 class="tsd-type-parameters-title">Type parameters</h4>
				{context.typeParameters(props.typeParameters)}
			</>
		)}
		{props.parameters && props.parameters.length > 0 && (
			<>
				<h4 class="tsd-parameters-title">Parameters</h4>
				<ul class="tsd-parameters">
					{props.parameters.map((item) => (
						<li>
							<h5>
								{renderFlags(item.flags)}
								{!!item.flags.isRest && <span class="tsd-signature-symbol">...</span>}
								{item.name}
								{": "}
								{context.type(item.type)}
								{item.defaultValue != null && (
									<span class="tsd-signature-symbol">
										{" = "}
										{item.defaultValue}
									</span>
								)}
							</h5>
							{context.comment(item)}
							{item.type instanceof ReflectionType && context.parameter(item.type.declaration)}
						</li>
					))}
				</ul>
			</>
		)}
		{props.type && (
			<>
				<h4 class="tsd-returns-title">
					{"Returns "}
					{context.type(props.type)}
				</h4>
				{!!props.comment?.returns && (
					<div>
						<JSX.Raw html={context.markdown(props.comment.returns)} />
					</div>
				)}
				{props.type instanceof ReflectionType && context.parameter(props.type.declaration)}
			</>
		)}
	</>
);
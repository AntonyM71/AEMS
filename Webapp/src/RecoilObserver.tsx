// See this site for where this is from. https://recoiljs.org/docs/guides/testing/

import { useEffect } from "react"
import { RecoilState, useRecoilValue } from "recoil"
export const RecoilObserver = ({ node, onChange }: observerPropsType) => {
	const value: any = useRecoilValue(node)
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
	useEffect(() => onChange(value), [onChange, value])

	return null
}

interface observerPropsType {
	node: RecoilState<any>
	onChange: jest.Mocked<any>
}

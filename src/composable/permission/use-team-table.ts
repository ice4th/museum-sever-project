import { onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  IMemberInfo,
  ITeamInfo,
} from '/@src/types/interfaces/permission.interface'
import usePermissionApi from '../api/usePermissionApi'
import { errMessage } from '/@src/helpers/filter.helper'
import useNotyf from '../useNotyf'
import { IDatatableHeader } from '/@src/types/interfaces/component.interface'

export interface UseTeamTableState {
  teamInfo: ITeamInfo[]
  isloading: boolean
  currentPage: number
  perPage: number
  total: number
  totalPage: number
  search?: string
  validate: Object
}

export default function useTeamTable() {
  const state = reactive<UseTeamTableState>({
    teamInfo: [],
    isloading: false,
    currentPage: 1,
    perPage: 10,
    total: 1,
    totalPage: 1,
    search: undefined,
    validate: {},
  })

  const route = useRoute()
  const notyf = useNotyf()
  const { getAllTeam, deleteTeam: deleteTeamApi } = usePermissionApi()

  const fetchAllTeam = async () => {
    state.isloading = true
    if (route.query.perPage) {
      state.perPage = +(route.query.perPage as string)
    }
    if (route.query.page) {
      state.currentPage = +(route.query.page as string)
    }
    if (route.query.search) {
      state.search = route.query.search as string
    }
    const res = await getAllTeam({
      currentPage: state.currentPage,
      perPage: state.perPage,
      search: state.search,
    })
    state.isloading = false
    state.teamInfo = res.data
    state.total = res.total
    state.totalPage = res.totalPage
  }

  const deleteTeam = async (id: number) => {
    if (window.confirm('Delete confirmation') == true) {
      const res = await deleteTeamApi(+id)

      if (res.status === 200) {
        notyf.success('success!')
        state.validate = {}
        history.go(0)
      } else {
        notyf.error(errMessage(res.message))
      }
    } else return
  }

  const parseAvatarStack = (admins: IMemberInfo[]) => {
    return admins.map((admin) => {
      console.log(admin)
      const member = {
        picture: admin.avatar,
      }
      return member
    })
  }
  // router.push({ name: 'permission-team' })
  onMounted(() => {
    fetchAllTeam()
  })

  const teamTableHeaders: IDatatableHeader[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Team' },
    { key: 'description', label: 'Description' },
    { key: 'member', label: 'Member', isRaw: true },
    { key: 'action', label: 'Action', isEnd: true, isRaw: true },
  ]
  // const avatarTable = [{ key: 'avatar', label: 'Member', isRaw: true }]

  return { ...toRefs(state), teamTableHeaders, deleteTeam, parseAvatarStack }
}
